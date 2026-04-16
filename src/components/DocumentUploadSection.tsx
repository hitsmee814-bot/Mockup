"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PremiumButton } from "../app/utils/PremiumButton";
import { Upload, Paperclip, X, AlertCircle, Info, Loader2 } from "lucide-react";
import { scanUploadService } from "@/services/ScanUploadServices";
import { toast } from "sonner";

interface DocumentMember {
  document_type: string;
  identifier: string;
  description: string;
}

interface DocumentGroup {
  groupid: number;
  group_name: string;
  min: number;
  max: number;
  members: DocumentMember[];
}

interface DocumentUploadSectionProps {
  group: DocumentGroup;
  submitAttempted: boolean;
  onValidationChange: (groupId: number, isValid: boolean) => void;
  phoneNumber: string;
}

interface UploadedDocumentInfo {
  document_type: string;
  identifierValue: string;
  filePath: string;
  description: string;
}

// GSTIN Validation Function (ONLY for GST_CERT - MANDATORY)
const isValidGSTIN = (gstin: string): boolean => {
  if (!gstin) return false;
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin.toUpperCase());
};

// Helper to check if identifier is GSTIN type (MANDATORY)
const isGSTINField = (documentType: string): boolean => {
  return documentType === "GST_CERT";
};

// Helper to check if identifier is optional (all identifiers except GSTIN)
const isIdentifierOptional = (documentType: string): boolean => {
  return !isGSTINField(documentType);
};

// Simple Tooltip Component using Portal
const InfoTooltip = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5,
        left: rect.left + rect.width / 2,
      });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-flex ml-2 cursor-help"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Info className="h-3.5 w-3.5 text-[#00AFEF]" />
      </div>
      {isVisible && typeof window !== "undefined" && createPortal(
        <div
          className="fixed z-[9999] bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-normal break-words max-w-[280px]"
          style={{
            top: position.top,
            left: position.left,
            transform: "translateX(-50%)",
          }}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
};

export const DocumentUploadSection = forwardRef<any, DocumentUploadSectionProps>(({ 
  group, 
  submitAttempted, 
  onValidationChange, 
  phoneNumber 
}, ref) => {
  const isOptional = group.min === 0;
  const [isUploading, setIsUploading] = useState(false);
 
  // Single member state (when group has only 1 document type)
  const [singleIdentifier, setSingleIdentifier] = useState("");
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [singleFilePath, setSingleFilePath] = useState<string>("");
  const [gstinError, setGstinError] = useState("");
 
  // Single select state (when user picks 1 from many)
  const [selectedMember, setSelectedMember] = useState<DocumentMember | null>(null);
  const [singleSelectIdentifier, setSingleSelectIdentifier] = useState("");
  const [singleSelectFile, setSingleSelectFile] = useState<File | null>(null);
  const [singleSelectFilePath, setSingleSelectFilePath] = useState<string>("");
 
  // Multi-document state (when user can upload multiple)
  const [tempMember, setTempMember] = useState<DocumentMember | null>(null);
  const [tempIdentifier, setTempIdentifier] = useState("");
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
 
  const [errorMessage, setErrorMessage] = useState("");
  const [maxLimitError, setMaxLimitError] = useState("");

  // Helper to get tooltip text
  const getTooltipText = () => {
    if (group.min === group.max && group.min > 0) return `Required: Upload exactly ${group.min} document(s)`;
    if (group.min === group.max && group.min === 0) return `Optional: Upload up to ${group.max} document(s)`;
    if (group.min > 0 && group.max > group.min) return `Required: Upload ${group.min} to ${group.max} document(s)`;
    if (group.min === 0 && group.max > 0) return `Optional: Upload up to ${group.max} document(s)`;
    return `Upload ${group.min} to ${group.max} document(s)`;
  };

  // Expose method to parent component via ref
  useImperativeHandle(ref, () => ({
    getUploadedDocuments: (): UploadedDocumentInfo[] => {
      const allDocs: UploadedDocumentInfo[] = [];
      
      // For single member group
      if (group.members.length === 1 && singleFilePath) {
        allDocs.push({
          document_type: group.members[0].document_type,
          identifierValue: singleIdentifier,
          filePath: singleFilePath,
          description: group.members[0].description
        });
      }
      
      // For single select group
      if (group.max === 1 && selectedMember && singleSelectFilePath) {
        allDocs.push({
          document_type: selectedMember.document_type,
          identifierValue: singleSelectIdentifier,
          filePath: singleSelectFilePath,
          description: selectedMember.description
        });
      }
      
      // For multi-document group
      for (const doc of uploadedDocs) {
        if (doc.filePath) {
          allDocs.push({
            document_type: doc.member.document_type,
            identifierValue: doc.identifierValue,
            filePath: doc.filePath,
            description: doc.member.description
          });
        }
      }
      
      return allDocs;
    }
  }));

  // Scan upload API call
  const performScanUpload = async (file: File, documentType: string): Promise<string | null> => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mobile_no", phoneNumber);
    formData.append("document_type", documentType);

    try {
      const response = await scanUploadService.scanUpload(formData);
      console.log("Scan upload response:", response);
      
      if (response?.status === "success" && response?.scan_status === "clean") {
        toast.success(`✓ Document scanned successfully!`, {
          position: "top-right",
          duration: 2000,
        });
        return response.file_path;
      } else if (response?.scan_status === "infected") {
        toast.error(`✗ File "${file.name}" failed virus scan. Please upload a clean file.`, {
          position: "top-right",
          duration: 5000,
        });
        return null;
      } else {
        toast.error(`✗ Failed to upload "${file.name}". Please try again.`, {
          position: "top-right",
          duration: 3000,
        });
        return null;
      }
    } catch (error: any) {
      console.error("Scan upload error:", error);
      toast.error(error?.message || `Failed to upload "${file.name}". Please try again.`, {
        position: "top-right",
        duration: 3000,
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle single member file upload with scan
  const handleSingleFileUpload = async (file: File) => {
    const filePath = await performScanUpload(file, group.members[0].document_type);
    if (filePath) {
      setSingleFile(file);
      setSingleFilePath(filePath);
    } else {
      setSingleFile(null);
      setSingleFilePath("");
    }
  };

  // Handle single select file upload with scan
  const handleSingleSelectFileUpload = async (file: File) => {
    if (!selectedMember) return;
    const filePath = await performScanUpload(file, selectedMember.document_type);
    if (filePath) {
      setSingleSelectFile(file);
      setSingleSelectFilePath(filePath);
    } else {
      setSingleSelectFile(null);
      setSingleSelectFilePath("");
    }
  };

  // Handle multi-document file upload with scan
  const handleMultiFileUpload = async () => {
    if (!tempMember || !tempFile) return;
    
    const filePath = await performScanUpload(tempFile, tempMember.document_type);
    if (filePath) {
      setUploadedDocs([
        ...uploadedDocs,
        {
          id: Date.now(),
          file: tempFile,
          member: tempMember,
          identifierValue: tempIdentifier,
          filePath: filePath,
        }
      ]);
      setTempMember(null);
      setTempIdentifier("");
      setTempFile(null);
      setMaxLimitError("");
    }
  };

  // Check if this section is valid
  const checkIsValid = () => {
    // Single member validation
    if (group.members.length === 1) {
      if (group.min > 0) {
        const hasFile = singleFile !== null;
        
        // For GSTIN field: identifier is MANDATORY and must be valid
        if (isGSTINField(group.members[0].document_type)) {
          const hasValidGSTIN = Boolean(singleIdentifier && isValidGSTIN(singleIdentifier));
          const isValid = hasFile && hasValidGSTIN;
          onValidationChange(group.groupid, isValid);
          return isValid;
        }
        
        // For all other document types: identifier is OPTIONAL
        const isValid = hasFile;
        onValidationChange(group.groupid, isValid);
        return isValid;
      }
      onValidationChange(group.groupid, true);
      return true;
    }
 
    // Single select validation (max === 1)
    if (group.max === 1) {
      if (group.min > 0) {
        const hasSelected = selectedMember !== null;
        const hasFile = singleSelectFile !== null;
        
        // For GSTIN field: identifier is MANDATORY and must be valid
        if (selectedMember && isGSTINField(selectedMember.document_type)) {
          const hasValidGSTIN = Boolean(singleSelectIdentifier && isValidGSTIN(singleSelectIdentifier));
          const isValid = hasSelected && hasFile && hasValidGSTIN;
          onValidationChange(group.groupid, isValid);
          return isValid;
        }
        
        // For all other document types: identifier is OPTIONAL
        const isValid = hasSelected && hasFile;
        onValidationChange(group.groupid, isValid);
        return isValid;
      }
      onValidationChange(group.groupid, true);
      return true;
    }
 
    // Multi-document validation (max > 1)
    if (group.min > 0) {
      const isValid = uploadedDocs.length >= group.min;
      onValidationChange(group.groupid, isValid);
      return isValid;
    }
 
    onValidationChange(group.groupid, true);
    return true;
  };

  // Real-time GSTIN validation (shows error below input field and blocks registration if invalid)
  useEffect(() => {
    if (group.members.length === 1 && isGSTINField(group.members[0].document_type)) {
      if (singleIdentifier && !isValidGSTIN(singleIdentifier)) {
        setGstinError("Please enter a valid GSTIN Number");
      } else {
        setGstinError("");
      }
    }
  }, [singleIdentifier, group]);

  // Update error message when submit attempted or state changes
  useEffect(() => {
    if (submitAttempted) {
      const isValid = checkIsValid();
      if (!isValid) {
        if (group.members.length === 1) {
          if (!singleFile) {
            setErrorMessage(`Please upload ${group.group_name} document`);
          } else if (isGSTINField(group.members[0].document_type) && (!singleIdentifier || !isValidGSTIN(singleIdentifier))) {
            setErrorMessage(`Please enter a valid GSTIN Number`);
          }
        } else if (group.max === 1) {
          if (!selectedMember) setErrorMessage(`Please select a document type for ${group.group_name}`);
          else if (!singleSelectFile) setErrorMessage(`Please upload ${selectedMember.description}`);
          else if (isGSTINField(selectedMember.document_type) && (!singleSelectIdentifier || !isValidGSTIN(singleSelectIdentifier))) {
            setErrorMessage(`Please enter a valid GSTIN Number`);
          }
        } else {
          if (uploadedDocs.length < group.min) setErrorMessage(`Please upload at least ${group.min} document(s) for ${group.group_name}`);
        }
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  }, [submitAttempted, singleFile, singleIdentifier, selectedMember, singleSelectFile, singleSelectIdentifier, uploadedDocs, group]);

  // Re-check validity when state changes (without showing errors)
  useEffect(() => {
    checkIsValid();
  }, [singleFile, singleIdentifier, selectedMember, singleSelectFile, singleSelectIdentifier, uploadedDocs]);

  // ========== SINGLE MEMBER UI ==========
  if (group.members.length === 1) {
    const member = group.members[0];
    const isGSTField = isGSTINField(member.document_type);
    const isIdentifierReq = isGSTField; // Only GSTIN is required
    const showIdentifierField = member.identifier && member.identifier.trim() !== "";
 
    return (
      <div className="space-y-2 mb-6">
        <div className="flex items-center">
          <Label className="text-slate-700 font-semibold">
            {group.group_name}
            {!isOptional && <span className="text-red-500 ml-1">*</span>}
            {isOptional && <span className="text-gray-500 text-xs ml-2">(Optional)</span>}
          </Label>
          <InfoTooltip text={getTooltipText()} />
        </div>
 
        <div className="border-2 border-dashed border-[#00AFEF] rounded-lg bg-white p-4">
          {showIdentifierField && (
            <div className="mb-4">
              <Label className="text-slate-700 mb-2 block">
                {member.identifier}
                {isIdentifierReq && <span className="text-red-500 ml-1">*</span>}
                {!isIdentifierReq && <span className="text-gray-400 text-xs ml-2">(Optional)</span>}
              </Label>
              <Input
                value={singleIdentifier}
                onChange={(e) => setSingleIdentifier(e.target.value)}
                placeholder={`Enter ${member.identifier}${!isIdentifierReq ? " (Optional)" : ""}`}
                className={`h-12 ${gstinError ? "border-red-500 focus:border-red-500" : ""}`}
              />
              {isGSTField && gstinError && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {gstinError}
                </p>
              )}
            </div>
          )}
 
          <div>
            <Label className="text-slate-700 mb-2 block">Upload {member.description}</Label>
            {!singleFile ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleSingleFileUpload(file);
                  }}
                  disabled={isUploading}
                />
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-[#00AFEF] animate-spin mb-2" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                )}
                <span className="text-sm text-gray-500">{isUploading ? "Uploading & Scanning..." : "Click to Upload"}</span>
                <span className="text-xs text-gray-400">PDF/JPG up to 15 MB</span>
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-2 flex-1">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                  <span className="text-sm truncate">{singleFile.name}</span>
                </div>
                <button onClick={() => { setSingleFile(null); setSingleFilePath(""); }} className="text-gray-400 hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
 
        {errorMessage && (
          <p className="text-red-600 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  // ========== SINGLE SELECT UI ==========
  if (group.max === 1) {
    return (
      <div className="space-y-2 mb-6">
        <div className="flex items-center">
          <Label className="text-slate-700 font-semibold">
            {group.group_name}
            {!isOptional && <span className="text-red-500 ml-1">*</span>}
            {isOptional && <span className="text-gray-500 text-xs ml-2">(Optional)</span>}
          </Label>
          <InfoTooltip text={getTooltipText()} />
        </div>
 
        <div className="border-2 border-dashed border-[#00AFEF] rounded-lg bg-white p-4">
          <div className="mb-4">
            <Label className="text-slate-700 mb-2 block">Select Document Type</Label>
            <Select
              value={selectedMember?.document_type || ""}
              onValueChange={(value) => {
                const member = group.members.find(m => m.document_type === value);
                setSelectedMember(member || null);
                setSingleSelectIdentifier("");
                setSingleSelectFile(null);
                setSingleSelectFilePath("");
              }}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {group.members.map((member) => (
                  <SelectItem key={member.document_type} value={member.document_type}>
                    {member.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
 
          {selectedMember && (
            <>
              <div className="mb-4">
                <Label className="text-slate-700 mb-2 block">
                  {selectedMember.identifier}
                  {isGSTINField(selectedMember.document_type) && <span className="text-red-500 ml-1">*</span>}
                  {!isGSTINField(selectedMember.document_type) && <span className="text-gray-400 text-xs ml-2">(Optional)</span>}
                </Label>
                <Input
                  value={singleSelectIdentifier}
                  onChange={(e) => setSingleSelectIdentifier(e.target.value)}
                  placeholder={`Enter ${selectedMember.identifier}${!isGSTINField(selectedMember.document_type) ? " (Optional)" : ""}`}
                  className="h-12"
                />
              </div>
 
              <div>
                <Label className="text-slate-700 mb-2 block">Upload {selectedMember.description}</Label>
                {!singleSelectFile ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleSingleSelectFileUpload(file);
                      }}
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 text-[#00AFEF] animate-spin mb-2" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    )}
                    <span className="text-sm text-gray-500">{isUploading ? "Uploading & Scanning..." : "Click to Upload"}</span>
                    <span className="text-xs text-gray-400">PDF/JPG up to 15 MB</span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 flex-1">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm truncate">{singleSelectFile.name}</span>
                    </div>
                    <button onClick={() => { setSingleSelectFile(null); setSingleSelectFilePath(""); }} className="text-gray-400 hover:text-red-500">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
 
        {errorMessage && (
          <p className="text-red-600 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  // ========== MULTI-DOCUMENT UI ==========
  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center">
        <Label className="text-slate-700 font-semibold">
          {group.group_name}
          {!isOptional && <span className="text-red-500 ml-1">*</span>}
          {isOptional && <span className="text-gray-500 text-xs ml-2">(Optional)</span>}
        </Label>
        <InfoTooltip text={getTooltipText()} />
      </div>
 
      <div className="border-2 border-dashed border-[#00AFEF] rounded-lg bg-white p-4">
        <div className="space-y-4">
          <div>
            <Label className="text-slate-700 mb-2 block">Select Document Type</Label>
            <Select
              value={tempMember?.document_type || ""}
              onValueChange={(value) => {
                const member = group.members.find(m => m.document_type === value);
                setTempMember(member || null);
                setTempIdentifier("");
                setTempFile(null);
                setMaxLimitError("");
              }}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {group.members.map((member) => {
                  const alreadyAdded = uploadedDocs.some(doc => doc.member.document_type === member.document_type);
                  if (alreadyAdded) return null;
                  return (
                    <SelectItem key={member.document_type} value={member.document_type}>
                      {member.description}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
 
          {tempMember && (
            <>
              <div>
                <Label className="text-slate-700 mb-2 block">
                  {tempMember.identifier}
                  {isGSTINField(tempMember.document_type) && <span className="text-red-500 ml-1">*</span>}
                  {!isGSTINField(tempMember.document_type) && <span className="text-gray-400 text-xs ml-2">(Optional)</span>}
                </Label>
                <Input
                  value={tempIdentifier}
                  onChange={(e) => setTempIdentifier(e.target.value)}
                  placeholder={`Enter ${tempMember.identifier}${!isGSTINField(tempMember.document_type) ? " (Optional)" : ""}`}
                  className="h-12"
                />
              </div>
 
              <div>
                <Label className="text-slate-700 mb-2 block">Upload {tempMember.description}</Label>
                {!tempFile ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setTempFile(file);
                      }}
                    />
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to Upload</span>
                    <span className="text-xs text-gray-400">PDF/JPG up to 15 MB</span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 flex-1">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm truncate">{tempFile.name}</span>
                    </div>
                    <button onClick={() => setTempFile(null)} className="text-gray-400 hover:text-red-500">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
 
              {/* Add Document button - shows when document type AND file are selected */}
              {tempMember && tempFile && (
                <PremiumButton
                  type="button"
                  variant="primary"
                  onClick={handleMultiFileUpload}
                  disabled={isUploading}
                  className="w-full"
                  icon={isUploading ? <Loader2 size={14} className="animate-spin" /> : null}
                >
                  {isUploading ? "Uploading & Scanning..." : "Add Document"}
                </PremiumButton>
              )}
            </>
          )}
        </div>
 
        {maxLimitError && (
          <p className="text-red-600 text-sm mt-3 flex items-center gap-1">
            <AlertCircle size={14} />
            {maxLimitError}
          </p>
        )}
 
        {uploadedDocs.length > 0 && (
          <div className="mt-4 space-y-2">
            <Label className="text-slate-700">Uploaded Documents ({uploadedDocs.length}/{group.max})</Label>
            {uploadedDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-start gap-2 flex-1">
                  <Paperclip className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">{doc.member.description} - {doc.identifierValue}</p>
                    <p className="text-xs text-gray-500">{doc.file.name}</p>
                  </div>
                </div>
                <button onClick={() => setUploadedDocs(uploadedDocs.filter(d => d.id !== doc.id))} className="text-gray-400 hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
 
      {errorMessage && (
        <p className="text-red-600 text-sm flex items-center gap-1">
          <AlertCircle size={14} />
          {errorMessage}
        </p>
      )}
    </div>
  );
});

DocumentUploadSection.displayName = "DocumentUploadSection";