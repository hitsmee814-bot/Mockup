"use client";
import { DocumentUploadSection } from "@/components/DocumentUploadSection";
import React, { useState, useEffect, useLayoutEffect, ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Upload, X, Paperclip, Info, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { passwordStrength } from "check-password-strength";
import { toast } from "sonner";
import logovar from "../../assets/images/logoPrimary.png";
import UIpic from "../../assets/images/agent-signup.jpg";
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { PremiumButton } from "../../utils/PremiumButton";

/* SERVICE IMPORTS */
import { phoneNoService } from "@/services/phoneNoService";
import { phoneNumberAvailService } from "@/services/phoneNumberAvailService";
import { userNameService } from "@/services/userNameService";
import { docTypelookupService } from "@/services/docTypes";
import { userCreationService } from "@/services/userCreationService";
import { agentProfileCreationService } from "@/services/agentProfileCreationService";
import { documentCreationService } from "@/services/documentCreationService";

// Shadcn UI Imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ---------------- TYPES ---------------- */

interface FormState {
  agencyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryCode: string;
  countryIso2: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  website: string;
}

interface ErrorState {
  [key: string]: string;
}

interface CountryOption {
  code: string;
  iso2: string;
  label: string;
}

// Document related types
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

interface UploadedDocumentInfo {
  document_type: string;
  identifierValue: string;
  filePath: string;
  description: string;
}

/* ---------------- CONSTANTS ---------------- */
const INPUT_STYLING = "mt-2 h-12 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]";
const LABEL_STYLING = "text-slate-700";

/* ---------------- MODERN TOOLTIP ---------------- */

const InfoTooltip = ({ text }: { text: string }) => (
  <TooltipProvider>
    <ShadcnTooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex ml-2 cursor-help">
          <Info className="h-3.5 w-3.5 text-[#00AFEF]" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-gray-900 text-white text-xs p-2 rounded-lg">
        <p>{text}</p>
      </TooltipContent>
    </ShadcnTooltip>
  </TooltipProvider>
);

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="text-red-600 text-[13px] font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-left-1 duration-300">
      <AlertCircle size={14} className="shrink-0" />
      {message}
    </p>
  );
};

function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center w-full">
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 1 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
        <div className="flex-1 h-[1px] bg-gray-300 mx-2" />
        <div className={`h-2.5 w-2.5 rounded-full ${step === 2 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
      </div>
      <div className="flex justify-between text-[12px] text-gray-600 mt-1">
        <span className={step === 1 ? 'font-semibold text-[#00AFEF]' : ''}>
          General
        </span>
        <span className={step === 2 ? 'font-semibold text-[#00AFEF]' : ''}>
          Documents
        </span>
      </div>
    </div>
  )
}

export default function AgentSignup(): JSX.Element {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Refs to access document data from DocumentUploadSection components
  const documentSectionsRef = useRef<{ [key: number]: any }>({});

  // State for localStorage data and field disabled status
  const [isPhoneFromStorage, setIsPhoneFromStorage] = useState<boolean>(false);
  const [isEmailFromStorage, setIsEmailFromStorage] = useState<boolean>(false);
  const [storedCountryIso, setStoredCountryIso] = useState<string>("");
  const [storedDialCode, setStoredDialCode] = useState<string>("");

  // Track if checks were manually performed
  const [phoneCheckedManually, setPhoneCheckedManually] = useState<boolean>(false);
  const [usernameCheckedManually, setUsernameCheckedManually] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    agencyName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    countryIso2: "IN",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    website: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [mandatoryError, setMandatoryError] = useState("");
  const [strengthLabel, setStrengthLabel] = useState("");
  const [strengthColor, setStrengthColor] = useState("");

  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<"available" | "unavailable" | null>(null);
  const [phoneStatus, setPhoneStatus] = useState<"available" | "unavailable" | null>(null);
  
  // Document state
  const [documentGroups, setDocumentGroups] = useState<DocumentGroup[]>([]);
  const [groupValidity, setGroupValidity] = useState<{ [key: number]: boolean }>({});
  const [globalDocError, setGlobalDocError] = useState("");
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [docFetchError, setDocFetchError] = useState("");
  
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadStoredData = () => {
      const storedPhone = localStorage.getItem("userPhoneNumber");
      const storedCountryCodeRaw = localStorage.getItem("userCountryCode");
      const storedEmail = localStorage.getItem("userEmail");

      if (storedCountryCodeRaw) {
        const parts = storedCountryCodeRaw.split("-");
        if (parts.length === 2) {
          const isoCode = parts[0];
          const dialCode = parts[1];
          setStoredCountryIso(isoCode);
          setStoredDialCode(dialCode);
          setForm(prev => ({ ...prev, countryCode: dialCode, countryIso2: isoCode }));
          const matchedCountry = countries.find(c => c.iso2 === isoCode);
          if (matchedCountry) {
            setSelectedCountry(matchedCountry);
          }
        }
      }

      if (storedPhone) {
        setForm(prev => ({ ...prev, phone: storedPhone }));
        setIsPhoneFromStorage(true);
      }

      if (storedEmail) {
        setForm(prev => ({ ...prev, email: storedEmail }));
        setIsEmailFromStorage(true);
      }
    };

    loadStoredData();
  }, [countries]);

  // Fetch document types when component mounts
  useEffect(() => {
    const fetchDocumentTypes = async () => {
      setIsLoadingDocs(true);
      setDocFetchError("");
      try {
        const response = await docTypelookupService.getDocTypes("AGENT");
        console.log("Document Types API Response:", response);
        
        let groups: DocumentGroup[] = [];
        
        if (response && Array.isArray(response) && response.length > 0 && response[0].json_agg) {
          const parsedData = JSON.parse(response[0].json_agg);
          groups = parsedData;
        } else if (Array.isArray(response)) {
          groups = response;
        }
        
        if (groups && groups.length > 0) {
          setDocumentGroups(groups);
        } else {
          setDocFetchError("No document groups found");
        }
      } catch (error) {
        console.error("Failed to fetch document types:", error);
        setDocFetchError("Failed to load document requirements. Please refresh the page.");
      } finally {
        setIsLoadingDocs(false);
      }
    };
    
    fetchDocumentTypes();
  }, []);

  // Fetch Phone Codes on Mount
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await phoneNoService.getPhoneCodes();
        let countryArray: any[] = [];

        if (Array.isArray(response)) {
          countryArray = response;
        } 
        else if (Array.isArray(response?.data)) {
          countryArray = response.data;
        } 
        else if (Array.isArray(response?.data?.phone_codes)) {
          countryArray = response.data.phone_codes;
        } 
        else if (Array.isArray(response?.phone_codes)) {
          countryArray = response.phone_codes;
        } 
        else {
          console.error("❌ Unknown API format:", response);
          return;
        }

        const parsed: CountryOption[] = countryArray
          .map((item: any) => {
            if (!item?.phone_code || !item?.iso2) return null;
            const code = item.phone_code.startsWith("+") ? item.phone_code : `+${item.phone_code}`;
            return {
              code,
              iso2: item.iso2.toUpperCase(),
              label: `${item.iso2.toUpperCase()} ${code}`,
            };
          })
          .filter((item): item is CountryOption => item !== null);

        const sorted = parsed.sort((a: CountryOption, b: CountryOption) => {
          if (a.iso2 === "IN") return -1;
          if (b.iso2 === "IN") return 1;
          return a.label.localeCompare(b.label);
        });

        setCountries(sorted);
        
        if (!storedCountryIso) {
          const indiaCountry = sorted.find(c => c.iso2 === "IN");
          if (indiaCountry) {
            setSelectedCountry(indiaCountry);
            setForm(prev => ({ ...prev, countryCode: indiaCountry.code, countryIso2: indiaCountry.iso2 }));
          } else if (sorted.length > 0) {
            setSelectedCountry(sorted[0]);
            setForm(prev => ({ ...prev, countryCode: sorted[0].code, countryIso2: sorted[0].iso2 }));
          }
        }
      } catch (error) {
        console.error("❌ Country API FAILED:", error);
        setCountries([]);
      }
    };
    fetchCodes();
  }, [storedCountryIso]);

  // Phone number validation using libphonenumber-js
  const validatePhoneNumber = (
    phoneNumberStr: string,
    countryCode: string,
    iso2: string
  ): string => {
    if (!phoneNumberStr) return "";
    
    const digits = phoneNumberStr.replace(/\D/g, "");
    if (digits.length === 0) return "";
    
    try {
      const phoneNumber = parsePhoneNumberFromString(
        `${countryCode}${digits}`,
        iso2 as CountryCode
      );
      
      if (!phoneNumber) {
        return "Invalid phone number format";
      }
      
      if (!phoneNumber.isValid()) {
        return `Invalid ${iso2} phone number`;
      }
      
      if (!phoneNumber.isPossible()) {
        return `Invalid length for ${iso2} number`;
      }
      
      return "";
    } catch (error) {
      return "Enter a valid phone number";
    }
  };

  // Check username availability using service
  const checkUsername = async () => {
    if (!form.username || errors.username) return;
    setIsCheckingUser(true);
    setUsernameStatus(null);
    try {
      const response = await userNameService.checkAvailability(form.username);
      console.log("Username availability response:", response);
      
      if (response?.available === true) {
        setUsernameStatus("available");
        setUsernameCheckedManually(true);
        toast.success("✓ Username is available!", {
          position: "top-right",
          duration: 3000,
        });
      } else {
        setUsernameStatus("unavailable");
        setUsernameCheckedManually(true);
        toast.error("✗ Username is not available. Please choose a different username.", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error("Username availability check error:", error);
      setUsernameStatus("available");
      setUsernameCheckedManually(true);
      toast.success("✓ Username is available!", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsCheckingUser(false);
    }
  };

  // Check phone availability using service
  const checkPhone = async () => {
    if (!form.phone || errors.phone) return;
    setIsCheckingPhone(true);
    setPhoneStatus(null);
    try {
      const response = await phoneNumberAvailService.checkAvailability(form.phone);
      console.log("Phone availability response:", response);
      
      if (response?.available === true) {
        setPhoneStatus("available");
        setPhoneCheckedManually(true);
        toast.success("✓ Phone number is available!", {
          position: "top-right",
          duration: 3000,
        });
      } else {
        setPhoneStatus("unavailable");
        setPhoneCheckedManually(true);
        toast.error(" Phone number is not available. Please use a different number.", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error("Phone availability check error:", error);
      setPhoneStatus("available");
      setPhoneCheckedManually(true);
      toast.success(" Phone number is available!", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsCheckingPhone(false);
    }
  };

  // Handle country selection change
  const handleCountryChange = (value: string) => {
    if (isPhoneFromStorage) return;
    
    const [iso2, code] = value.split("-");
    const selected = countries.find(c => c.iso2 === iso2 && c.code === code);
    if (selected) {
      setSelectedCountry(selected);
      setForm(prev => ({ ...prev, countryCode: selected.code, countryIso2: selected.iso2 }));
      if (form.phone) {
        const phoneError = validatePhoneNumber(form.phone, selected.code, selected.iso2);
        setErrors(prev => {
          const newErrors = { ...prev };
          if (phoneError) {
            newErrors.phone = phoneError;
          } else {
            delete newErrors.phone;
          }
          return newErrors;
        });
        setPhoneStatus(null);
        setPhoneCheckedManually(false);
      }
    }
  };

  const preventCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const isNameInPassword = (p: string, currentForm: FormState) => {
    const lowerP = p.toLowerCase();
    const nameParts = [currentForm.firstName, currentForm.middleName, currentForm.lastName, currentForm.agencyName]
      .filter(Boolean)
      .map(n => n.toLowerCase());
    return nameParts.some(name => name.length > 0 && lowerP.includes(name));
  };

  const isTrivialPassword = (p: string) => {
    if (p.length < 3) return false;
    const lowerP = p.toLowerCase();
    for (let i = 0; i <= lowerP.length - 3; i++) {
      const char1 = lowerP.charCodeAt(i);
      const char2 = lowerP.charCodeAt(i + 1);
      const char3 = lowerP.charCodeAt(i + 2);
      if (char1 === char2 && char2 === char3) return true;
      if (char2 === char1 + 1 && char3 === char2 + 1) return true;
      if (char2 === char1 - 1 && char3 === char2 - 1) return true;
      const specials = lowerP.substring(i, i + 3);
      if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3}$/.test(specials)) return true;
    }
    return false;
  };

  const passwordValidCriteria = (p: string) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(p);

  useEffect(() => {
    if (!form.password || !passwordValidCriteria(form.password) || isNameInPassword(form.password, form)) {
      setStrengthLabel("");
      setStrengthColor("");
      return;
    }
    if (isTrivialPassword(form.password)) {
      setStrengthLabel("weak password");
      setStrengthColor("text-red-600");
      return;
    }
    const assessment = passwordStrength(form.password);
    if (assessment.id <= 1) {
      setStrengthLabel("weak password");
      setStrengthColor("text-red-600");
    } else if (assessment.id === 2) {
      setStrengthLabel("medium password");
      setStrengthColor("text-yellow-600");
    } else {
      setStrengthLabel("strong password");
      setStrengthColor("text-green-600");
    }
  }, [form.password, form.agencyName, form.firstName, form.middleName, form.lastName]);

  const emailValid = (e: string) => {
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicRegex.test(e)) return { valid: false, errorType: "syntax" };
    const parts = e.split('@');
    const domainPart = parts[1].split('.')[0];
    if (/[A-Z]/.test(domainPart)) {
      return { valid: false, errorType: "casing" };
    }
    if (!/^[a-z0-9]+$/.test(domainPart)) {
      return { valid: false, errorType: "syntax" };
    }
    return { valid: true, errorType: "" };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleValueChange(name, value);
  };

  const handleValueChange = (name: string, value: string) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setMandatoryError("");
    if (name === "username") {
      setUsernameStatus(null);
      setUsernameCheckedManually(false);
    }
    if (name === "phone") {
      setPhoneStatus(null);
      setPhoneCheckedManually(false);
    }
    if (name === "confirmPassword" && value.length > 0) setShowPassword(false);
    let fieldError = "";
    
    if (value) {
      if (name === "username") {
        const allowedChars = /^[a-zA-Z][a-zA-Z0-9.]*$/;
        const forbiddenChars = /[&=_'\-+,<>]/;
        const doublePeriod = /\.\./;
        const lengthValid = value.length >= 6 && value.length <= 16;
        const endsWithPeriod = value.endsWith('.');
        if (!allowedChars.test(value)) {
          fieldError = "Username must start with a letter and only contain letters, numbers, or periods.";
        } else if (forbiddenChars.test(value)) {
          fieldError = "Username cannot contain characters like &, =, _, ', -, +, ,, or brackets.";
        } else if (doublePeriod.test(value)) {
          fieldError = "Username cannot contain more than one period in a row.";
        } else if (!lengthValid) {
          fieldError = "Username must be between 6 and 16 characters.";
        } else if (endsWithPeriod) {
          fieldError = "Username cannot end with a period.";
        }
      }
      if (name === "email" && !isEmailFromStorage) {
        const validation = emailValid(value);
        if (!validation.valid) {
          fieldError = validation.errorType === "casing"
            ? "Email domain must be in lowercase"
            : "Please enter a valid email address";
        }
      }
      if (name === "phone" && !isPhoneFromStorage) {
        fieldError = validatePhoneNumber(value, updatedForm.countryCode, updatedForm.countryIso2);
      }
      if (name === "password") {
        if (!passwordValidCriteria(value)) {
          fieldError = "Password criteria not fulfilled yet.";
        } else if (isNameInPassword(value, updatedForm)) {
          fieldError = " Agency name or First name or Middle name or Last name cannot be used in password setting ";
        }
      }
      if (name === "confirmPassword") {
        if (value !== updatedForm.password) {
          fieldError = "The passwords you entered do not match.";
        }
      }
    }
    
    setErrors(prev => {
      const newErrs = { ...prev };
      if (!value) {
        delete newErrs[name];
      } else if (fieldError) {
        newErrs[name] = fieldError;
      } else {
        delete newErrs[name];
      }
      if (name === "password" && updatedForm.confirmPassword) {
        if (updatedForm.confirmPassword !== value) {
          newErrs.confirmPassword = "The passwords you entered do not match.";
        } else {
          delete newErrs.confirmPassword;
        }
      }
      return newErrs;
    });
  };

  const generateUsername = () => {
    if (!form.agencyName) return;
    const cleanAgency = form.agencyName.replace(/[^a-zA-Z]/g, "").slice(0, 9);
    const timestamp = Date.now().toString().slice(-6);
    const newUsername = `${cleanAgency}${timestamp}`.toLowerCase();
    setForm(prev => ({ ...prev, username: newUsername }));
    setErrors(prev => {
      const newErrs = { ...prev };
      delete newErrs.username;
      return newErrs;
    });
    setUsernameStatus(null);
    setUsernameCheckedManually(false);
  };

  const handleValidationChange = (groupId: number, isValid: boolean) => {
    setGroupValidity(prev => ({ ...prev, [groupId]: isValid }));
  };

  // Get tooltip text for phone number based on disabled state
  const getPhoneTooltipText = () => {
    if (isPhoneFromStorage) {
      return "Enter exactly 10 digits. Phone number has been OTP verified and cannot be edited. To change, please click Cancel and start over.";
    }
    return "Enter phone number with correct format for selected country";
  };

  // Get tooltip text for email based on disabled state
  const getEmailTooltipText = () => {
    if (isEmailFromStorage) {
      return "Enter a valid email address like name@example.com. Email has been OTP verified and cannot be edited. To change, please click Cancel and start over.";
    }
    return "Enter a valid email address like name@example.com";
  };

  const handleNextStep = async () => {
    const mandatoryFields: (keyof FormState)[] = [
      "agencyName", "firstName", "lastName",
      "email", "phone", "username",
      "password", "confirmPassword"
    ];
    const emptyFields = mandatoryFields.filter(f => !form[f]);
    const hasInvalidFields = Object.values(errors).some(e => e);
    if (emptyFields.length > 0 || hasInvalidFields || strengthLabel === "weak password") {
      setMandatoryError("Kindly fill-up all the mandatory fields correctly for a successful registration");
      const newErrors = { ...errors };
      emptyFields.forEach(f => newErrors[f] = "Required");
      setErrors(newErrors);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    try {
      // STEP 1: Auto-check phone availability
      let phoneAvailable = false;
      if (!phoneCheckedManually) {
        try {
          const phoneResponse = await phoneNumberAvailService.checkAvailability(form.phone);
          if (phoneResponse?.available === true) {
            setPhoneStatus("available");
            phoneAvailable = true;
            toast.success("Phone number is available!", {
              position: "top-right",
              duration: 3000,
            });
          } else {
            setPhoneStatus("unavailable");
            toast.error("Phone number is not available. Please use a different number.", {
              position: "top-right",
              duration: 3000,
            });
            return;
          }
        } catch (error) {
          console.error("Auto phone check error:", error);
          phoneAvailable = true;
        }
      } else if (phoneStatus === "available") {
        phoneAvailable = true;
      } else if (phoneStatus === "unavailable") {
        toast.error("Phone number is not available. Please use a different number.", {
          position: "top-right",
          duration: 3000,
        });
        return;
      }
      
      // STEP 2: Auto-check username availability
      let usernameAvailable = false;
      if (!usernameCheckedManually) {
        try {
          const usernameResponse = await userNameService.checkAvailability(form.username);
          if (usernameResponse?.available === true) {
            setUsernameStatus("available");
            usernameAvailable = true;
            await new Promise(resolve => setTimeout(resolve, 900));
            toast.success("Username is available!", {
              position: "top-right",
              duration: 2000,
            });
          } else {
            setUsernameStatus("unavailable");
            toast.error("Username is not available. Please choose a different username.", {
              position: "top-right",
              duration: 3000,
            });
            return;
          }
        } catch (error) {
          console.error("Auto username check error:", error);
          usernameAvailable = true;
        }
      } else if (usernameStatus === "available") {
        usernameAvailable = true;
      } else if (usernameStatus === "unavailable") {
        toast.error("Username is not available. Please choose a different username.", {
          position: "top-right",
          duration: 3000,
        });
        return;
      }
      
      // STEP 3: Fetch document types
      if (phoneAvailable && usernameAvailable) {
        setIsLoadingDocs(true);
        try {
          const response = await docTypelookupService.getDocTypes("AGENT");
          console.log("Document Types API Response:", response);
          
          let groups: DocumentGroup[] = [];
          
          if (response && Array.isArray(response) && response.length > 0 && response[0].json_agg) {
            const parsedData = JSON.parse(response[0].json_agg);
            groups = parsedData;
          } else if (Array.isArray(response)) {
            groups = response;
          }
          
          if (groups && groups.length > 0) {
            setDocumentGroups(groups);
            setCurrentStep(2);
            setSubmitAttempted(false);
          } else {
            setDocFetchError("No document groups found");
            toast.error("Failed to load document requirements. Please try again.", {
              position: "top-right",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error("Failed to fetch document types:", error);
          setDocFetchError("Failed to load document requirements. Please refresh the page.");
          toast.error("Failed to load document requirements. Please try again.", {
            position: "top-right",
            duration: 3000,
          });
        } finally {
          setIsLoadingDocs(false);
        }
      }
    } finally {
      setIsCheckingPhone(false);
      setIsCheckingUser(false);
    }
  };

  // Collect all uploaded documents from DocumentUploadSection components
  const collectUploadedDocuments = (): UploadedDocumentInfo[] => {
    const allDocs: UploadedDocumentInfo[] = [];
    
    for (const group of documentGroups) {
      const sectionRef = documentSectionsRef.current[group.groupid];
      if (sectionRef) {
        // Get documents from the section
        const docs = sectionRef.getUploadedDocuments?.() || [];
        allDocs.push(...docs);
      }
    }
    
    return allDocs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setIsRegistering(true);
    
    // Check each mandatory group
    let allValid = true;
    for (const group of documentGroups) {
      if (group.min > 0) {
        if (!groupValidity[group.groupid]) {
          allValid = false;
          break;
        }
      }
    }
    
    if (!allValid) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      setGlobalDocError("Kindly fill-up all the mandatory fields correctly for successful registration");
      setIsRegistering(false);
      return;
    }
    
    // Collect all uploaded documents
    const allUploadedDocs = collectUploadedDocuments();
    
    if (allUploadedDocs.length === 0) {
      setGlobalDocError("Please upload at least one document to complete registration");
      setIsRegistering(false);
      return;
    }
    
    setGlobalDocError("");
    
    try {
      // STEP 1: Create User API Call (runs ONCE)
      const createUserPayload = {
        username: form.username,
        password: form.password,
        user_org_id: 3,
        email: form.email,
        phone: form.phone
      };
      
      const userResponse = await userCreationService.createUser(createUserPayload);
      const userId = userResponse.user_id;
      console.log("User created with ID:", userId);
      toast.success("✓ User account created successfully!", { position: "top-right", duration: 2000 });
      
      // STEP 2: Create Agent Profile API Call (runs ONCE)
      const agentProfilePayload = {
        user_id: userId,
        agencyname: form.agencyName,
        firstname: form.firstName,
        middlename: form.middleName || "",
        lastname: form.lastName,
        email: form.email,
        countrycode: storedDialCode || form.countryCode,
        phonenumber: form.phone,
        websiteurl: form.website || ""
      };
      
      await agentProfileCreationService.createAgentProfile(agentProfilePayload);
      toast.success("✓ Agent profile created successfully!", { position: "top-right", duration: 2000 });
      
      // STEP 3: Create Document Records (runs in LOOP for each uploaded document)
      let successCount = 0;
      let failCount = 0;
      
      for (let i = 0; i < allUploadedDocs.length; i++) {
        const doc = allUploadedDocs[i];
        
        try {
          const documentPayload = {
            user_id: userId,
            document_type: doc.document_type,
            path: doc.filePath
          };
          
          await documentCreationService.createDocument(documentPayload);
          successCount++;
          toast.success(`✓ ${doc.description} document saved!`, {
            position: "top-right",
            duration: 2000,
          });
          await new Promise(resolve => setTimeout(resolve, 800));
        } catch (docError: any) {
          console.error(`Failed to save document ${doc.description}:`, docError);
          toast.error(`✗ Failed to save "${doc.description}". ${docError?.message || "Please try again."}`, {
            position: "top-right",
            duration: 3000,
          });
          failCount++;
        }
      }
      
      if (failCount > 0) {
        toast.warning(`Registration partially completed. ${successCount} documents saved, ${failCount} failed.`, {
          position: "top-right",
          duration: 5000,
        });
      } else {
        toast.success("🎉 Registration Successful! You have successfully registered as Agent.", {
          position: "top-right",
          duration: 4000,
        });
      }
      
      // Clear localStorage
      localStorage.removeItem("userPhoneNumber");
      localStorage.removeItem("userCountryCode");
      localStorage.removeItem("userEmail");
      
      // Redirect to home page
      setTimeout(() => {
        router.push("/");
      }, 3000);
      
    } catch (error: any) {
      console.error("Registration error:", error);
      
      let errorMessage = "Failed to process your request.";
      
      if (error?.message && error.message !== "Failed to fetch") {
        errorMessage = error.message;
      } else if (error?.toString && error.toString() !== "Failed to fetch") {
        errorMessage = error.toString();
      }
      
      toast.error(errorMessage, { position: "top-right", duration: 5000 });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-blue-50 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        html, body { 
          overflow: hidden !important; 
          scrollbar-width: none !important; 
        }
        body::-webkit-scrollbar { display: none !important; width: 0 !important; }
      `}} />

      <div className="bg-white shadow-sm px-6 py-3 flex items-center shrink-0 z-20">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Image src={logovar} alt="logo" width={32} height={32} />
          <h1 className="text-lg font-bold text-[#00AFEF]">Bonhomiee</h1>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center px-4 py-4 overflow-hidden">
        <div className="bg-white w-full max-w-4xl h-full md:h-[88vh] rounded-[4px] border border-[#f1f1f1] grid grid-cols-1 md:grid-cols-2 overflow-hidden transition-all duration-300">
          <div className="hidden md:block relative">
            <Image src={UIpic} alt="Agent Signup" fill className="object-cover" />
            <div className="absolute inset-0 bg-blue-900/10"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden bg-white">
            <div className="px-8 pt-5 pb-2 shrink-0 bg-white flex flex-col items-center">
              <h2 className="text-[16px] font-extrabold text-[#00AFEF] tracking-tight text-center">
                Agent / Agency Signup
              </h2>
              <StepIndicator step={currentStep as 1 | 2} />
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto overflow-x-visible px-8 py-6 
              scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-transparent
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#00AFEF]
              [&::-webkit-scrollbar-thumb]:rounded-full">

              {mandatoryError && currentStep === 1 && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2 animate-in zoom-in-95">
                  <AlertCircle size={16} />
                  {mandatoryError}
                </div>
              )}

              {globalDocError && currentStep === 2 && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2 animate-in zoom-in-95">
                  <AlertCircle size={16} />
                  {globalDocError}
                </div>
              )}

              {docFetchError && currentStep === 2 && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {docFetchError}
                </div>
              )}

              {isLoadingDocs && currentStep === 2 && (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  <Loader2 className="h-8 w-8 text-[#00AFEF] animate-spin mb-4" />
                  <p className="text-gray-500">Loading document requirements...</p>
                </div>
              )}

              {currentStep === 1 ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-4">
                    <Label className={LABEL_STYLING}>
                      Agency Name<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        name="agencyName"
                        value={form.agencyName}
                        onChange={handleChange}
                        placeholder="Enter agency name"
                        className={`${INPUT_STYLING} flex-grow ${errors.agencyName ? 'border-red-600' : ''}`}
                      />
                      <PremiumButton
                        type="button"
                        variant="accent"
                        onClick={generateUsername}
                        disabled={!form.agencyName}
                        className="mt-2"
                      >
                        Generate
                      </PremiumButton>
                    </div>
                    <ErrorMessage message={errors.agencyName} />
                  </div>

                  <InputField label="First Name" name="firstName" placeholder="Enter first name" required form={form} errors={errors} handleChange={handleChange} />
                  <InputField label="Middle Name (Optional)" name="middleName" placeholder="Enter middle name" form={form} errors={errors} handleChange={handleChange} />
                  <InputField label="Last Name" name="lastName" placeholder="Enter last name" required form={form} errors={errors} handleChange={handleChange} />

                  {/* Email field - disabled if from storage */}
                  <div className="mb-4">
                    <div>
                      <Label className={`${LABEL_STYLING} flex items-center`}>
                        Email<span className="text-red-500 ml-1">*</span>
                        <Tooltip text={getEmailTooltipText()} />
                      </Label>
                      <Input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        disabled={isEmailFromStorage}
                        className={`${INPUT_STYLING} ${errors.email ? 'border-red-600' : ''} ${isEmailFromStorage ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      />
                    </div>
                    <ErrorMessage message={errors.email} />
                  </div>

                  {/* Phone Number Section */}
                  <div className="mb-4">
                    <Label className={`${LABEL_STYLING} flex items-center`}>
                      Phone Number<span className="text-red-500 ml-1">*</span>
                      <Tooltip text={getPhoneTooltipText()} />
                    </Label>
                    <div className="flex gap-3 items-center">
                      <div className="mt-2 w-[96px] shrink-0">
                        <Select
                          value={selectedCountry ? `${selectedCountry.iso2}-${selectedCountry.code}` : ""}
                          onValueChange={handleCountryChange}
                          disabled={isPhoneFromStorage}
                        >
                          <SelectTrigger className={`w-full !h-12 bg-white text-slate-900 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"} ${isPhoneFromStorage ? "bg-gray-100 cursor-not-allowed" : ""} [&_.lucide-chevron-down]:hidden`}>
                            <SelectValue placeholder="Select country" />
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </SelectTrigger>
                          <SelectContent className="bg-white max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-gray-100">
                            {countries.length > 0 ? (
                              countries.map((c) => (
                                <SelectItem key={`${c.iso2}-${c.code}`} value={`${c.iso2}-${c.code}`}>
                                  {c.label}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="p-2 text-sm text-gray-500">Loading countries...</div>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={(e) => {
                          const onlyDigits = e.target.value.replace(/\D/g, "");
                          handleValueChange("phone", onlyDigits);
                        }}
                        inputMode="numeric"
                        placeholder="Enter phone number"
                        disabled={isPhoneFromStorage}
                        className={`${INPUT_STYLING} flex-grow ${errors.phone ? 'border-red-600' : ''} ${isPhoneFromStorage ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      />
                      <PremiumButton
                        type="button"
                        variant="accent"
                        onClick={checkPhone}
                        disabled={!form.phone || isCheckingPhone || !!errors.phone}
                        className="mt-2"
                      >
                        {isCheckingPhone ? <Loader2 size={12} className="animate-spin" /> : "CHECK"}
                      </PremiumButton>
                    </div>
                    <ErrorMessage message={errors.phone} />
                    
                    {phoneStatus === "available" && !errors.phone && form.phone && (
                      <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="text-green-700 text-xs font-bold tracking-tight">Phone number is available!</span>
                      </div>
                    )}

                    {phoneStatus === "unavailable" && !errors.phone && form.phone && (
                      <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <AlertCircle size={14} className="text-red-600" />
                        <span className="text-red-700 text-xs font-bold tracking-tight">This phone number already exists. Please use another number.</span>
                      </div>
                    )}
                  </div>

                  {/* Username Section */}
                  <div className="mb-4">
                    <Label className={`${LABEL_STYLING} flex items-center`}>
                      Username<span className="text-red-500 ml-1">*</span>
                      <Tooltip text="Usernames: 6-16 chars. Must start with letter. Can include letters, numbers, and periods (not ending with or consecutive). No other symbols like &, =, _, etc." />
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter or generate username"
                        className={`${INPUT_STYLING} flex-grow ${errors.username ? 'border-red-600' : ''}`}
                      />
                      <PremiumButton
                        type="button"
                        variant="accent"
                        onClick={checkUsername}
                        disabled={!form.username || isCheckingUser || !!errors.username}
                        className="mt-2"
                      >
                        {isCheckingUser ? <Loader2 size={12} className="animate-spin" /> : "CHECK"}
                      </PremiumButton>
                    </div>
                    <ErrorMessage message={errors.username} />
                    
                    {usernameStatus === "available" && !errors.username && form.username && (
                      <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="text-green-700 text-xs font-bold tracking-tight">Username is available!</span>
                      </div>
                    )}

                    {usernameStatus === "unavailable" && !errors.username && form.username && (
                      <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <AlertCircle size={14} className="text-red-600" />
                        <span className="text-red-700 text-xs font-bold tracking-tight">This username already exists. Please choose another username.</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <Label className={`${LABEL_STYLING} flex items-center`}>
                      Password<span className="text-red-500 ml-1">*</span>
                      <Tooltip text="Minimum 8 characters including at least one uppercase, lowercase, number and special character." />
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onCopy={preventCopyPaste} onCut={preventCopyPaste} onPaste={preventCopyPaste}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className={`${INPUT_STYLING} pr-10 ${errors.password ? 'border-red-600' : ''}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 hover:text-[#00AFEF] transition-colors">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {strengthLabel && !errors.password && (
                      <div className="mt-2.5 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="h-1.5 flex-grow bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-500 ${strengthLabel === 'weak password' ? 'w-1/3 bg-red-500' :
                              strengthLabel === 'medium password' ? 'w-2/3 bg-yellow-500' : 'w-full bg-green-500'
                            }`} />
                        </div>
                        <span className={`text-[11px] font-extrabold uppercase tracking-widest ${strengthColor}`}>
                          {strengthLabel}
                        </span>
                      </div>
                    )}
                    <ErrorMessage message={errors.password} />
                  </div>

                  <div className="mb-4">
                    <Label className={LABEL_STYLING}>
                      Re-Type Password<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      onFocus={() => setShowPassword(false)}
                      onCopy={preventCopyPaste} onCut={preventCopyPaste} onPaste={preventCopyPaste}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className={`${INPUT_STYLING} ${errors.confirmPassword ? 'border-red-600' : ''}`}
                    />
                    <ErrorMessage message={errors.confirmPassword} />
                  </div>

                  <InputField label="Website (Optional)" name="website" placeholder="Enter agency website URL" form={form} errors={errors} handleChange={handleChange} />
                </div>
              ) : (
                /* STEP 2: DOCUMENTS */
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
                  {!isLoadingDocs && !docFetchError && documentGroups.length > 0 ? (
                    documentGroups.map((group) => (
                      <DocumentUploadSection
                        key={group.groupid}
                        ref={(el) => {
                          if (el) {
                            documentSectionsRef.current[group.groupid] = el;
                          }
                        }}
                        group={group}
                        submitAttempted={submitAttempted}
                        onValidationChange={handleValidationChange}
                        phoneNumber={form.phone}
                      />
                    ))
                  ) : !isLoadingDocs && !docFetchError && documentGroups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                      <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-yellow-500">
                        <AlertCircle className="text-yellow-500" size={28} />
                      </div>
                      <h3 className="text-slate-800 font-bold text-lg mb-2">No Document Requirements</h3>
                      <p className="text-slate-500 text-sm">No document types are currently configured for agent registration.</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="px-8 py-6 shrink-0 bg-white">
              {currentStep === 1 ? (
                <div className="grid grid-cols-2 gap-4">
                  <PremiumButton
                    type="button"
                    onClick={() => router.push("/")}
                    variant="destructive"
                    size="lg"
                    className="w-full"
                  >
                    Cancel
                  </PremiumButton>
                  <PremiumButton
                    type="button"
                    onClick={handleNextStep}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Save and Next
                  </PremiumButton>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <PremiumButton
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setTimeout(() => {
                        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                      }, 100);
                    }}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Back
                  </PremiumButton>
                  <PremiumButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isRegistering}
                    icon={isRegistering ? <Loader2 size={16} className="animate-spin" /> : null}
                  >
                    {isRegistering ? "Registering..." : "Register"}
                  </PremiumButton>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

interface InputFieldProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  form: FormState;
  errors: ErrorState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, name, required, placeholder, form, errors, handleChange }: InputFieldProps) => (
  <div className="mb-4">
    <Label className={LABEL_STYLING}>
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </Label>
    <Input
      name={name}
      value={form[name as keyof FormState]}
      onChange={handleChange}
      placeholder={placeholder}
      className={`${INPUT_STYLING} ${errors[name] ? 'border-red-600' : ''}`}
    />
    <ErrorMessage message={errors[name]} />
  </div>
);

// Reused Tooltip component for backward compatibility
const Tooltip = ({ text }: { text: string }) => (
  <div className="relative group inline-block ml-2">
    <span className="text-[#00AFEF] text-xs cursor-help">ⓘ</span>
    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50 min-w-[240px] max-w-[300px] bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-normal break-words leading-relaxed">
      {text}
    </div>
  </div>
);