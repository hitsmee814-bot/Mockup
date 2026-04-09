'use client'

import React from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input as ShadInput } from "@/components/ui/input"
import { FileInput } from "./SupplierUtils"
import { PremiumButton } from "../../../utils/PremiumButton";
import { scanUploadService  }from "@/services/scanUploadService";
import { Upload as UploadIcon, Paperclip, X, AlertCircle, Loader2,CheckCircle  } from "lucide-react"
import { TooltipIcon,numberToWord } from "./SupplierUtils"

type Props = {

  docGroups: any[]

  uploadedFiles: { [key: number]: File | null }
  setUploadedFiles: React.Dispatch<
    React.SetStateAction<{ [key: number]: File | null }>
  >

  selectedDocs: { [key: number]: any }
  setSelectedDocs: React.Dispatch<
    React.SetStateAction<{ [key: number]: any }>
  >

  tempDocs: { [key: number]: any }
  setTempDocs: React.Dispatch<
    React.SetStateAction<{ [key: number]: any }>
  >

  multiFiles: { [key: number]: File | null }
  setMultiFiles: React.Dispatch<
    React.SetStateAction<{ [key: number]: File | null }>
  >

  multiDocs: { [key: number]: any[] }
  setMultiDocs: React.Dispatch<
    React.SetStateAction<{ [key: number]: any[] }>
  >

  handleAddMultiDocument: (group: any) => void

  
  submitted: {
    step3: boolean
  }

}

export default function SupplierDocuments({

  docGroups,
  uploadedFiles,
  setUploadedFiles,
  selectedDocs,
  setSelectedDocs,
  tempDocs,
  setTempDocs,
  multiFiles,
  setMultiFiles,
  multiDocs,
  setMultiDocs,
  handleAddMultiDocument,

  submitted   //  ADD THIS

}: Props)

{
  const [identifierErrors, setIdentifierErrors] =
  React.useState<{
    [key: number]: string
  }>({})
  const [scanLoading, setScanLoading] =
React.useState<{ [key: number]: boolean }>({})

const [scanErrors, setScanErrors] =
React.useState<{ [key: number]: string }>({})

const [scanSuccess, setScanSuccess] =
React.useState<{ [key: number]: string }>({})

const getPanelBorderClass = (group: any) => {

  // Do not validate until Register clicked
  if (!submitted.step3) {
    return "border-[#00AFEF]";
  }

  // ===== CASE 1 (single member) =====

  if (group.members.length === 1) {

    const identifier =
      tempDocs[group.groupid]?.identifierValue;

    const file =
      uploadedFiles[group.groupid];

    if (group.min > 0) {

      if (!identifier || !file) {
        return "border-red-500";
      }

    }

    return "border-[#00AFEF]";
  }

  // ===== CASE 2 (multiple types, max=1) =====

  if (group.members.length > 1 && group.max === 1) {

       const file =
      uploadedFiles[group.groupid];

    if (group.min > 0) {

      if (!file) {
        return "border-red-500";
      }

    }

    return "border-[#00AFEF]";
  }

  // ===== CASE 3 (multiple types, max>1) =====

  if (group.members.length > 1 && group.max > 1) {

    const docs =
      multiDocs[group.groupid] || [];

    if (group.min > 0 &&
        docs.length < group.min) {

      return "border-red-500";
    }

    return "border-[#00AFEF]";
  }

  return "border-[#00AFEF]";
};


const isGroupInvalid = (group: any) => {

  // Do not validate until Register clicked
  if (!submitted.step3) return false;

  // ===== CASE 1 =====
  // Single member
  if (group.members.length === 1) {

    const identifier =
      tempDocs[group.groupid]
        ?.identifierValue;

    const file =
      uploadedFiles[group.groupid];

    if (group.min > 0) {

      if (!identifier || !file) {
        return true;
      }

    }

    return false;
  }

  // ===== CASE 2 =====
  // Multiple members but only one allowed
  // ===== CASE 2 =====
if (
  group.members.length > 1 &&
  group.max === 1
) {

  const file =
    uploadedFiles[group.groupid];

  if (group.min > 0) {

    return !file;   // Only file required

  }

  return false;
}

  // ===== CASE 3 =====
  // Multiple documents allowed
  if (
    group.members.length > 1 &&
    group.max > 1
  ) {

    const docs =
      multiDocs[group.groupid] || [];

    if (group.min > 0) {

      if (docs.length < group.min) {
        return true;
      }

    }

    return false;
  }

  return false;
};

const isIdentifierMissing = (group: any) => {

  if (!submitted.step3) return false

  if (group.min === 0) return false

  const identifier =
    tempDocs[group.groupid]
      ?.identifierValue

  const file =
    uploadedFiles[group.groupid]

  // identifier missing but file exists
  return !identifier && file
}

  return (
    <>
      {docGroups.length === 0 ? (
        <p className="text-sm text-gray-500">
          Loading document panels...
        </p>
      ) : (

        docGroups.map((group) => (

          <div
            key={group.groupid}
            className="space-y-2"
          >

            {/* PANEL TITLE */}

            <Label className="text-slate-700">
              {group.group_name}

              {group.min > 0 && (
                <span className="text-red-500">
                  {" "}*
                </span>
              )}
               {group.max === 1 ? (
                  <TooltipIcon
                    id={`tooltip-single-${group.groupid}`}
                  content={`Only one type of ${group.group_name} can be uploaded.`}

                  />
                ) : (
                  <TooltipIcon
                    id={`tooltip-multi-${group.groupid}`}
                    content={`A maximum of ${numberToWord(group.max)} documents can be uploaded.`}
                  />
                )}

               </Label>
        

            {/* DASHED PANEL */}

            <div   className={`
                border-2
                border-dashed
                rounded
                bg-white
                p-4
                min-h-[120px]
                ${getPanelBorderClass(group)}
              `}>

              {/* ===== SINGLE MEMBER ===== */}

              {group.members.length === 1 && (

                group.members.map(
                  (member: any) => (

                  <div
                    key={member.document_type}
                    className="flex flex-col gap-3"
                  >
                      <Label>
                {member.identifier}
                {group.min > 0 && <span className="text-red-500"> *</span>}
              </Label>

   <ShadInput
  type="text"

  placeholder={`Enter ${member.identifier || ""}`}

  value={
    tempDocs[group.groupid]
      ?.identifierValue || ""
  }
onChange={(e) => {

  setTempDocs(prev => ({
    ...prev,
    [group.groupid]: {
      ...member,
      identifierValue: e.target.value
    }
  }))

  // clear upload error when typing

  setIdentifierErrors(prev => ({
    ...prev,
    [group.groupid]: ""
  }))

}}

  className="h-12"
/>

   <FileInput
  label={`Upload ${member.description}`}

  required={group.min > 0}

  file={
    uploadedFiles[group.groupid] || null
  }

  

  /* BLOCK FILE PICKER */
  onBeforeSelect={() => {

    const identifier =
      tempDocs[group.groupid]
        ?.identifierValue

    if (!identifier) {

      setIdentifierErrors(prev => ({
        ...prev,
        [group.groupid]:
          `Please enter ${member.identifier}`
      }))

      return false   //  block picker
    }

    return true      // allow picker
  }}

  /*  SAVE FILE */
onChange={async (file) => {

   console.log(
    "File changed:",
    group.groupid,
    file
  )
  if (file === null) {

    //  DELETE FILE

    setUploadedFiles(prev => {

      const updated = { ...prev }

      delete updated[group.groupid]

      return updated
    })

    return
  }

  console.log("File selected:", file)
  if (!file) return;

  try {
    console.log("Calling scan API...")


    // Start scanning
    setScanLoading(prev => ({
      ...prev,
      [group.groupid]: true
    }))

    setScanErrors(prev => ({
      ...prev,
      [group.groupid]: ""
    }))

    const mobile_no =
      localStorage.getItem("userPhoneNumber") || "";
console.log(mobile_no)
    const documentType =
      member.document_type;
console.log(documentType)
    // Call scan API
   const response =
  await scanUploadService(
    file,
    mobile_no,
    documentType
  );
      console.log("Scan API response:", response)
    // Stop scanning
    setScanLoading(prev => ({
      ...prev,
      [group.groupid]: false
    }))

    if (
      response.status === "success" &&
      response.scan_status === "clean"
    ) {

      // Save file
      setUploadedFiles(prev => ({
        ...prev,
        [group.groupid]: file
      }))

      setScanSuccess(prev => ({
    ...prev,
    [group.groupid]:
      "File scanned successfully"
  }))

  // Auto-hide after 2 seconds
  setTimeout(() => {

    setScanSuccess(prev => ({
      ...prev,
      [group.groupid]: ""
    }))

  }, 2000);

    } else {

      setScanErrors(prev => ({
        ...prev,
        [group.groupid]:
          "File failed security scan"
      }))

    }

  } catch (error) {

     console.error("Scan API error:", error)

    setScanLoading(prev => ({
      ...prev,
      [group.groupid]: false
    }))

    setScanErrors(prev => ({
      ...prev,
      [group.groupid]:
        "Unable to scan file"
    }))
    setScanSuccess(prev => ({
  ...prev,
  [group.groupid]: ""
}))

  }
  

}}


/>   
{scanLoading[group.groupid] && (

  <p className="text-blue-600 text-sm mt-1 flex items-center gap-2">

   <Loader2 
  className="h-4 w-4 animate-spin text-blue-600 [animation-duration:2.5s]" 
/>

    Scanning file...

  </p>

)}
{/* SUCCESS MESSAGE */}

{scanSuccess[group.groupid] && (

  <p className="text-green-600 text-sm mt-1 flex items-center gap-2">

    <CheckCircle
      className="h-4 w-4 text-green-600"
    />
console.log(  {scanSuccess[group.groupid]})
    {scanSuccess[group.groupid]}

  </p>

)}
{/* ERROR MESSAGE */}

{scanErrors[group.groupid] && (

  <p className="text-red-600 text-sm mt-1 flex items-center gap-2">

    <AlertCircle
      className="h-4 w-4 text-red-600"
    />

    {scanErrors[group.groupid]}

  </p>

)}




</div>  ))        )}




              {/* ===== MULTIPLE MEMBER ===== */}

              {group.members.length > 1 && group.max === 1 && (

                <div className="flex flex-col gap-3">

                 <Label htmlFor={`document-${group.groupid}`}>
                 Select {group.group_name}
                </Label>

                  <Select
                    value={
                      selectedDocs[group.groupid]
                        ?.document_type || ""
                    }

                    onValueChange={(value) => {

                      const selectedMember =
                        group.members.find(
                          (m: any) =>
                            m.document_type === value
                        )

                                        setSelectedDocs(prev => ({
                      ...prev,
                      [group.groupid]: {
                        ...selectedMember,
                        identifierValue: ""
                      }
                    }))

                    // clear file
                    setUploadedFiles(prev => ({
                      ...prev,
                      [group.groupid]: null
                    }))

                    // clear identifier error
                    setIdentifierErrors(prev => ({
                      ...prev,
                      [group.groupid]: ""
                    }))

                    }}
                  >

                    <SelectTrigger
                        className={`w-full !h-12 bg-white border border-slate-300 
                        text-slate-900 placeholder:text-slate-400 
                        focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
                        `}
                      >
                      <SelectValue
                        placeholder="Select document type"
                      />
                    </SelectTrigger>

                    <SelectContent>

                      {group.members.map(
                        (member: any) => (

                          <SelectItem
                            key={member.document_type}
                            value={member.document_type}
                          >

                            {member.description}

                          </SelectItem>

                        )
                      )}

                    </SelectContent>

                  </Select>
                  {/* SHOW INPUT AFTER SELECT */}

          {selectedDocs[group.groupid] && (

  <>

    {/* Identifier Label */}

    <Label>

      {
        selectedDocs[group.groupid]
          .identifier
      }

      {group.min > 0 && (

        <span className="text-red-500">
          {" "}*
        </span>

      )}

    </Label>

    {/* Identifier Input */}

    <ShadInput
  type="text"
  placeholder={`Enter ${
    selectedDocs[group.groupid]?.identifier || ""
  }`}

  value={
    selectedDocs[group.groupid]?.identifierValue || ""
  }

  onChange={(e) => {

    setSelectedDocs(prev => ({
      ...prev,
      [group.groupid]: {
        ...(prev[group.groupid] || {}),
        identifierValue: e.target.value
      }
    }))

    // clear upload error when typing
    setIdentifierErrors(prev => ({
      ...prev,
      [group.groupid]: ""
    }))

  }}

  className="h-12"
/>

    {/* FILE UPLOAD */}

  <FileInput
  label={`Upload ${
    selectedDocs[group.groupid]?.description || ""
  }`}

  required={group.min > 0}

  file={
    uploadedFiles[group.groupid] || null
  }

  /* ALLOW FILE PICKER EVEN IF IDENTIFIER EMPTY */
  onBeforeSelect={() => {

    // Clear previous identifier error
    setIdentifierErrors(prev => ({
      ...prev,
      [group.groupid]: ""
    }))

    return true   // Always allow file picker

  }}

  /* SAVE FILE */
  
  /* FILE CHANGE + SCANNING (Same as Case-1) */
  onChange={async (file) => {

    console.log(
      "File changed:",
      group.groupid,
      file
    )

    if (file === null) {

      // DELETE FILE
      setUploadedFiles(prev => {

        const updated = { ...prev }

        delete updated[group.groupid]

        return updated
      })

      return
    }

    console.log("File selected:", file)

    if (!file) return;

    try {

      console.log("Calling scan API...")

      // Start scanning
      setScanLoading(prev => ({
        ...prev,
        [group.groupid]: true
      }))

      setScanErrors(prev => ({
        ...prev,
        [group.groupid]: ""
      }))

      const mobile_no =
        localStorage.getItem(
          "userPhoneNumber"
        ) || "";

      console.log(mobile_no)

      const documentType =
        selectedDocs[group.groupid]
          ?.document_type;

      console.log(documentType)

      // Call scan API
      const response =
        await scanUploadService(
          file,
          mobile_no,
          documentType
        );

      console.log(
        "Scan API response:",
        response
      )

      // Stop scanning
      setScanLoading(prev => ({
        ...prev,
        [group.groupid]: false
      }))

      if (
        response.status === "success" &&
        response.scan_status === "clean"
      ) {

        // Save file
        setUploadedFiles(prev => ({
          ...prev,
          [group.groupid]: file
        }))
         // Clear error
  setScanErrors(prev => ({
    ...prev,
    [group.groupid]: ""
  }))

        // Show success message
  setScanSuccess(prev => ({
    ...prev,
    [group.groupid]:
      "File scanned successfully"
  }))

  // Auto hide after 2 sec
  setTimeout(() => {

    setScanSuccess(prev => ({
      ...prev,
      [group.groupid]: ""
    }))

  }, 2000)


      } else {

        setScanErrors(prev => ({
          ...prev,
          [group.groupid]:
            "File failed security scan. Please upload a valid file."
        }))

      }

    } catch (error) {

      console.error(
        "Scan API error:",
        error
      )

      setScanLoading(prev => ({
        ...prev,
        [group.groupid]: false
      }))

      setScanErrors(prev => ({
        ...prev,
        [group.groupid]:
          "Unable to scan file.Please try again."
      }))

    }

  }}
/>
{scanLoading[group.groupid] && (

  <p className="text-blue-600 text-sm mt-1 flex items-center gap-2">

    <Loader2
      className="h-4 w-4 animate-spin text-blue-600 [animation-duration:2.5s]"
    />

    Scanning file...

  </p>

)}

{/* SUCCESS MESSAGE */}

{scanSuccess[group.groupid] && (

  <p className="text-green-600 text-sm mt-1 flex items-center gap-2">

    <CheckCircle
      className="h-4 w-4 text-green-600"
    />

    {scanSuccess[group.groupid]}

  </p>

)}

{/* ERROR MESSAGE */}

{scanErrors[group.groupid] && (

  <p className="text-red-600 text-sm mt-1 flex items-center gap-2">

    <AlertCircle
      className="h-4 w-4 text-red-600"
    />

    {scanErrors[group.groupid]}

  </p>

)}

  </>

)}
                </div>

              )}



{/*-----------------------------------------*/}



             {group.members.length > 1 && group.max > 1 && (

  <div className="flex flex-col gap-3">

    <Label htmlFor={`document-${group.groupid}`}>
      Select {group.group_name}
    </Label>

    <Select
      value={
        tempDocs[group.groupid]
          ?.document_type || ""
      }

      onValueChange={(value) => {

        const member =
          group.members.find(
            (m: any) =>
              m.document_type === value
          )

        // reset identifier + file on dropdown change
        setTempDocs(prev => ({
          ...prev,
          [group.groupid]: {
            ...member,
            identifierValue: ""
          }
        }))

        setMultiFiles(prev => ({
          ...prev,
          [group.groupid]: null
        }))

        setIdentifierErrors(prev => ({
          ...prev,
          [group.groupid]: ""
        }))

      }}
    >

      <SelectTrigger
        className={`w-full !h-12 bg-white border border-slate-300 
        text-slate-900 placeholder:text-slate-400 
        focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
        `}
      >
        <SelectValue
          placeholder="Select document type"
        />
      </SelectTrigger>

      <SelectContent>

        {group.members.map(
          (member: any) => (

            <SelectItem
              key={member.document_type}
              value={member.document_type}
            >

              {member.description}

            </SelectItem>

          )
        )}

      </SelectContent>

    </Select>

    {tempDocs[group.groupid] && (

      <>

        {/* Identifier Label */}

        <Label>
          {
            tempDocs[group.groupid]
              ?.identifier
          }
        </Label>

        {/* Identifier Input */}

        <ShadInput
          type="text"

          placeholder={`Enter ${
            tempDocs[group.groupid]
              ?.identifier || ""
          }`}

          value={
            tempDocs[group.groupid]
              ?.identifierValue || ""
          }

          onChange={(e) => {

            setTempDocs(prev => ({
              ...prev,
              [group.groupid]: {
                ...(prev[group.groupid] || {}),
                identifierValue: e.target.value
              }
            }))

            // clear upload error
            setIdentifierErrors(prev => ({
              ...prev,
              [group.groupid]: ""
            }))

          }}
        />

        {/* FILE INPUT */}

        <FileInput
  label={`Upload ${
    tempDocs[group.groupid]
      ?.description || ""
  }`}

  file={
    multiFiles[group.groupid] || null
  }

  /* ALLOW FILE PICKER EVEN IF IDENTIFIER EMPTY */
  onBeforeSelect={() => {

    // Clear previous identifier error
    setIdentifierErrors(prev => ({
      ...prev,
      [group.groupid]: ""
    }))

    return true   // ✅ Always allow picker

  }}

  onChange={(file) => {

    setIdentifierErrors(prev => ({
      ...prev,
      [group.groupid]: ""
    }))

    setMultiFiles(prev => ({
      ...prev,
      [group.groupid]: file
    }))

  }}
/>

 {/* IDENTIFIER ERROR MESSAGE */}

        {identifierErrors[group.groupid] && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {identifierErrors[group.groupid]}
          </p>
        )}

        {/* ADD BUTTON */}

        <PremiumButton
          type="button"
          variant="primary"
          size="lg"

          onClick={() =>
            handleAddMultiDocument(group)
          }
        >
          Add Document
        </PremiumButton>


    {/* ===== DOCUMENT LIST (NEW DESIGN) ===== */}

{multiDocs[group.groupid]?.map(
  (doc: any, index: number) => (

    <div
      key={index}

      className="
        flex
        items-center
        justify-between
        border
        border-blue-300
        rounded
        px-3
        py-2
        bg-gray-50
        mt-2
      "
    >

      {/* LEFT SIDE */}

      <div className="flex items-start gap-2">
       {/* Paperclip Icon */}

<Paperclip className="h-4 w-4 text-gray-500 mt-1 shrink-0" />

        {/* TEXT SECTION */}

        <div className="flex flex-col">

          {/* Document Type + Identifier */}

          <span className="font-medium text-sm">

            {doc.description}
            {" - "}
            {doc.identifierValue}

          </span>

          {/* File Name */}

          <span className="text-xs text-gray-500">

            {doc.file.name}

          </span>

        </div>

      </div>

      {/* DELETE BUTTON */}

      <button
        type="button"

         className="
    text-gray-400
    hover:text-red-500
        "

        onClick={() => {

          const updated =
            multiDocs[group.groupid]
              .filter(
                (_: any, i: number) =>
                  i !== index
              )

          setMultiDocs(prev => ({
            ...prev,
            [group.groupid]: updated
          }))

        }}
      >

        <X className="h-4 w-4" />

      </button>

    </div>

  )
)}




{/* ===== MAX LIMIT MESSAGE ===== */}

{multiDocs[group.groupid]?.length >= group.max && (

  <p className="text-red-500 text-sm">

    Maximum {group.max} documents added

  </p>

)}

  </>
  

)}

                </div>

              )}

            </div>
       {/* IDENTIFIER ERROR */}

{/* IDENTIFIER ERROR — only shown if user tried file upload */}
{identifierErrors[group.groupid] &&
 group.max === 1 && (   // only show outside for Case 1 & 2
  <p className="text-red-500 text-sm flex items-center gap-1">
    <AlertCircle className="h-4 w-4" />
    {identifierErrors[group.groupid]}
  </p>
)}

{/* REQUIRED ERROR — shown on Register click only */}
{submitted.step3 &&
 !identifierErrors[group.groupid] &&
 isGroupInvalid(group) && (
  <p className="text-red-500 text-sm flex items-center gap-1">
    <AlertCircle className="h-4 w-4" />
    Required
  </p>
)}
          </div>

        ))

      )}
    </>
  )
}