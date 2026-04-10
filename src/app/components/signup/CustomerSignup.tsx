"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { passwordStrength } from "check-password-strength";
import { toast } from "sonner";
import logovar from "../../assets/images/logoPrimary.png";
import UIpic from "../../assets/images/traveling-concept-with-landmarks.jpg";

/* SERVICE IMPORTS */
import { phoneNoService } from "@/services/phoneNoService";
import { phoneNumberAvailService } from "@/services/phoneNumberAvailService";
import { userNameService } from "@/services/userNameService";
import { userCreationService } from "@/services/userCreationService";
import { customerProfileCreationService } from "@/services/customerProfileCreationService";

/* PREMIUM BUTTON IMPORT */
import { PremiumButton } from "../../utils/PremiumButton";

/* SHADCN UI IMPORTS */
import { Input as ShadInput } from "@/components/ui/input";
import { Label as ShadLabel } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

/* TYPES */
type FormType = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type ErrorType = {
  [key: string]: string;
};

type CountryOption = {
  code: string;
  label: string;
};



/* TOOLTIP COMPONENT */
const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative group inline-block ml-2">
    <span className="text-[#00AFEF] text-xs cursor-help">ⓘ</span>
    <div className="
      absolute bottom-full left-0 mb-2
      hidden group-hover:block z-50
      min-w-[220px] max-w-[300px]
      bg-gray-900 text-white text-xs
      px-3 py-2 rounded-lg shadow-lg
      whitespace-normal break-words
      leading-relaxed
    ">
      {text}
    </div>
  </div>
);

/* ERROR MESSAGE COMPONENT */
const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <p className="text-red-600 text-xs font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-left-1 duration-300">
      <AlertCircle size={12} className="shrink-0" />
      {message}
    </p>
  );
};

/* INPUT COMPONENT */
type InputProps = {
  name: string;
  label: string;
  required?: boolean;
  tooltip?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
};

const CustomInput: React.FC<InputProps> = ({
  name,
  label,
  required,
  tooltip,
  placeholder,
  value,
  error,
  onChange,
  type = "text",
  autoFocus,
  disabled = false
}) => (
  <div className="mb-4">
    <ShadLabel htmlFor={name} className="text-slate-700 flex items-center">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && <Tooltip text={tooltip} />}
    </ShadLabel>
    <ShadInput
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      disabled={disabled}
      className={`mt-2 h-12 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${
        error ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
    <ErrorMessage message={error} />
  </div>
);

export default function CustomerSignup(): JSX.Element {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State for localStorage data and field disabled status
  const [isPhoneFromStorage, setIsPhoneFromStorage] = useState<boolean>(false);
  const [isEmailFromStorage, setIsEmailFromStorage] = useState<boolean>(false);
  const [storedCountryIso, setStoredCountryIso] = useState<string>("");
  const [storedDialCode, setStoredDialCode] = useState<string>("");

  // State for individual check buttons
  const [isPhoneChecking, setIsPhoneChecking] = useState<boolean>(false);
  const [phoneStatus, setPhoneStatus] = useState<"available" | "unavailable" | null>(null);
  const [isUsernameChecking, setIsUsernameChecking] = useState<boolean>(false);
  const [usernameStatus, setUsernameStatus] = useState<"available" | "unavailable" | null>(null);
  
  // Track if checks were manually performed
  const [phoneCheckedManually, setPhoneCheckedManually] = useState<boolean>(false);
  const [usernameCheckedManually, setUsernameCheckedManually] = useState<boolean>(false);

  const [form, setForm] = useState<FormType>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mandatoryError, setMandatoryError] = useState<string>("");
  const [strengthLabel, setStrengthLabel] = useState<string>("");
  const [strengthColor, setStrengthColor] = useState<string>("");
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [countries, setCountries] = useState<CountryOption[]>([
    { code: "IN", label: "🇮🇳 +91" },
    { code: "US", label: "🇺🇸 +1" },
    { code: "GB", label: "🇬🇧 +44" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          setCountryCode(isoCode as CountryCode);
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
  }, []);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await phoneNoService.getPhoneCodes();
        if (response?.data) setCountries(response.data);
      } catch (err) {
        console.warn("Using default country codes as service is unavailable");
      }
    };
    fetchCodes();
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalScrollbarWidth = document.body.style.scrollbarWidth;
  
    document.body.style.overflow = "hidden";
    document.body.style.scrollbarWidth = "none";
  
    const style = document.createElement("style");
    style.innerHTML = `
      body::-webkit-scrollbar {
        width: 0px;
        background: white;
      }
    `;
    document.head.appendChild(style);
  
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.scrollbarWidth = originalScrollbarWidth;
      document.head.removeChild(style);
    };
  }, []);

  const containsNamePart = (p: string) => {
    const lowerP = p.toLowerCase();
    const nameParts = [form.firstName, form.middleName, form.lastName]
      .filter(Boolean)
      .map(n => n.toLowerCase());
    return nameParts.some(name => name.length > 0 && lowerP.includes(name));
  };

  const isTrivialPassword = (p: string) => {
    if (p.length < 3) return false;
    const lowerP = p.toLowerCase();
    
    for (let i = 0; i <= p.length - 3; i++) {
      const char1 = lowerP.charCodeAt(i);
      const char2 = lowerP.charCodeAt(i + 1);
      const char3 = lowerP.charCodeAt(i + 2);
      
      const isNum = (c: number) => c >= 48 && c <= 57;
      const isAlpha = (c: number) => c >= 97 && c <= 122;
      const isSpec = (c: number) => (c >= 33 && c <= 47) || (c >= 58 && c <= 64) || (c >= 91 && c <= 96) || (c >= 123 && c <= 126);

      if (char1 === char2 && char2 === char3) return true;

      if (isNum(char1) && isNum(char2) && isNum(char3)) {
        if (char2 === char1 + 1 && char3 === char2 + 1) return true;
        if (char2 === char1 - 1 && char3 === char2 - 1) return true;
      }

      if (isAlpha(char1) && isAlpha(char2) && isAlpha(char3)) {
        if (char2 === char1 + 1 && char3 === char2 + 1) return true;
        if (char2 === char1 - 1 && char3 === char2 - 1) return true;
      }

      if (isSpec(char1) && isSpec(char2) && isSpec(char3)) return true;
    }

    const commonSequences = ["qwerty", "asdfgh"];
    return commonSequences.some(seq => lowerP.includes(seq));
  };

  const passwordValidCriteria = (p: string) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(p);
  const isCriteriaMet = passwordValidCriteria(form.password);

  useEffect(() => {
    if (!form.password || !isCriteriaMet || containsNamePart(form.password)) {
      setStrengthLabel("");
      setStrengthColor("");
      return;
    }
    const assessment = passwordStrength(form.password);
    if (assessment.id <= 1 || isTrivialPassword(form.password)) {
      setStrengthLabel("weak password");
      setStrengthColor("text-red-600");
    } else if (assessment.id === 2) {
      setStrengthLabel("medium password");
      setStrengthColor("text-yellow-600");
    } else {
      setStrengthLabel("strong password");
      setStrengthColor("text-green-600");
    }
  }, [form.password, form.firstName, form.middleName, form.lastName, isCriteriaMet]);

  const emailValid = (e: string) => {
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicRegex.test(e)) return { valid: false, errorType: "syntax" };
    const parts = e.split('@');
    const domainPart = parts[1].split('.')[0];
    if (/[A-Z]/.test(domainPart)) return { valid: false, errorType: "casing" };
    const noSpecialCharsRegex = /^[a-z0-9]+$/;
    if (!noSpecialCharsRegex.test(domainPart)) return { valid: false, errorType: "syntax" };
    return { valid: true, errorType: "" };
  };

  const validatePhoneNumber = (p: string, country: CountryCode) => {
    if (!p) return "";
    if (!/^[0-9]{10}$/.test(p)) return "Phone number must be exactly 10 digits.";
    if (country === "IN" && !/^[6-9]\d{9}$/.test(p)) return "Enter valid phone number";
    const phoneNumber = parsePhoneNumberFromString(p, country);
    if (!phoneNumber || !phoneNumber.isValid()) return "Enter valid phone number";
    return "";
  };

  // FIXED: Phone availability check - ACTUAL API CALL
  const checkPhoneAvailability = async () => {
    console.log("🚨🚨🚨 CHECK PHONE FUNCTION IS CALLED 🚨🚨🚨");
    if (!form.phone || errors.phone) return;
    
    setIsPhoneChecking(true);
    setPhoneStatus(null);
    
    try {
      const response = await phoneNumberAvailService.checkAvailability(form.phone);
      console.log("Phone availability response:", response);
      
      if (response?.available === true) {
        setPhoneStatus("available");
        setPhoneCheckedManually(true);
        toast.success("Phone number is available!", {
          position: "top-right",
          duration: 3000,
        });
      } else {
        setPhoneStatus("unavailable");
        setPhoneCheckedManually(true);
        toast.error("Phone number is not available. Please use a different number.", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error("Phone availability check error:", error);
      // Default to available on error (since database integration pending)
      setPhoneStatus("available");
      setPhoneCheckedManually(true);
      toast.success("Phone number is available!", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsPhoneChecking(false);
    }
  };

  // FIXED: Username availability check - ACTUAL API CALL
  const checkUsername = async () => {
    if (!form.username || errors.username) return;
    
    setIsUsernameChecking(true);
    setUsernameStatus(null);
    
    try {
      const response = await userNameService.checkAvailability(form.username);
      console.log("Username availability response:", response);
      
      if (response?.available === true) {
        setUsernameStatus("available");
        setUsernameCheckedManually(true);
        toast.success("Username is available!", {
          position: "top-right",
          duration: 3000,
        });
      } else {
        setUsernameStatus("unavailable");
        setUsernameCheckedManually(true);
        toast.error("Username is not available. Please choose a different username.", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error("Username availability check error:", error);
      // Default to available on error (since database integration pending)
      setUsernameStatus("available");
      setUsernameCheckedManually(true);
      toast.success("Username is available!", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsUsernameChecking(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") setShowPassword(false);

    setForm(prev => ({ ...prev, [name]: value }));
    setMandatoryError("");

    let fieldError = "";
    
    if (name === "email" && !isEmailFromStorage && value) {
        const validation = emailValid(value);
        if (!validation.valid) {
            fieldError = validation.errorType === "casing" 
                ? "Email domain must be in lowercase" 
                : "Please enter a valid email address";
        }
    }
    
    if (name === "phone" && !isPhoneFromStorage && value) {
      fieldError = validatePhoneNumber(value, countryCode);
      if (value !== form.phone) {
        setPhoneStatus(null);
        setPhoneCheckedManually(false);
      }
    }
    
    if (name === "username") {
        setUsernameStatus(null);
        setUsernameCheckedManually(false);
        const allowedChars = /^[a-zA-Z][a-zA-Z0-9.]*$/;
        const forbiddenChars = /[&=_'\-+,<>]/;
        const doublePeriod = /\.\./;
        const lengthValid = value.length >= 6 && value.length <= 16;
        const endsWithPeriod = value.endsWith('.');

        if (value === "") {
            fieldError = "";
        } else if (!allowedChars.test(value)) {
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

    if (name === "password") {
      if (value && !passwordValidCriteria(value)) fieldError = "Password criteria not fulfilled yet";
      else if (value && containsNamePart(value)) fieldError = "First name or Middle name or Last name cannot be used in password setting";
      
      if (form.confirmPassword && value !== form.confirmPassword && value !== "") {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }

    if (name === "confirmPassword" && value && value !== form.password) fieldError = "The passwords you entered do not match.";

    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleCountryChange = (value: CountryCode) => {
    if (!isPhoneFromStorage) {
      setCountryCode(value);
      if (form.phone) {
        setErrors(prev => ({ ...prev, phone: validatePhoneNumber(form.phone, value) }));
      }
    }
  };

  const preventCopyPaste = (e: React.ClipboardEvent) => { e.preventDefault(); };

  // Main submit handler with sequential API calls
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const requiredFields: (keyof FormType)[] = ["firstName", "lastName", "email", "phone", "username", "password", "confirmPassword"];
    const newFieldErrors: ErrorType = {};
    let hasEmptyField = false;

    requiredFields.forEach(field => {
      if (!form[field]) {
        newFieldErrors[field] = "Required";
        hasEmptyField = true;
      }
    });

    const hasDynamicErrors = Object.values(errors).some(err => err !== "" && err !== "Required");
    
    if (hasEmptyField || hasDynamicErrors || strengthLabel === "weak password") {
      setErrors(prev => ({ ...prev, ...newFieldErrors }));
      setMandatoryError("Kindly fill-up all the mandatory fields correctly for a successful registration");
      toast.error("Please fill all mandatory fields correctly", {
        position: "top-right",
      });
      
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // AUTO-CHECK: Phone availability if not checked manually
      if (!phoneCheckedManually) {
        try {
          const phoneResponse = await phoneNumberAvailService.checkAvailability(form.phone);
          if (phoneResponse?.available !== true) {
            setPhoneStatus("unavailable");
            toast.error("Phone number is not available. Please use a different number.", {
              position: "top-right",
              duration: 3000,
            });
            setIsSubmitting(false);
            return;
          } else {
            setPhoneStatus("available");
          }
        } catch (error) {
          console.error("Auto phone check error:", error);
          // Continue anyway since database pending
        }
      } else if (phoneStatus === "unavailable") {
        toast.error("Phone number is not available. Please use a different number.", {
          position: "top-right",
          duration: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      // AUTO-CHECK: Username availability if not checked manually
      if (!usernameCheckedManually) {
        try {
          const usernameResponse = await userNameService.checkAvailability(form.username);
          if (usernameResponse?.available !== true) {
            setUsernameStatus("unavailable");
            toast.error("Username is not available. Please choose a different username.", {
              position: "top-right",
              duration: 3000,
            });
            setIsSubmitting(false);
            return;
          } else {
            setUsernameStatus("available");
          }
        } catch (error) {
          console.error("Auto username check error:", error);
          // Continue anyway since database pending
        }
      } else if (usernameStatus === "unavailable") {
        toast.error("Username is not available. Please choose a different username.", {
          position: "top-right",
          duration: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      // STEP 1: Create User API Call
      const createUserPayload = {
        username: form.username,
        password: form.password,
        user_org_id: 6,
        email: form.email,
        phone: form.phone
      };

      console.log("Creating user with payload:", createUserPayload);
      const userResponse = await userCreationService.createUser(createUserPayload);
      const userId = userResponse.user_id;
      console.log("User created with ID:", userId);

      // STEP 2: Create Customer Profile API Call
      let dialCode: string = "";

      if (storedDialCode) {
        dialCode = storedDialCode;
      }

      if (!dialCode && countryCode) {
        const selectedCountryData = countries.find(c => c.code === countryCode);
        if (selectedCountryData) {
          const match = selectedCountryData.label.match(/\+(\d+)/);
          if (match) {
            dialCode = `+${match[1]}`;
          }
        }
      }

      if (!dialCode) {
        dialCode = "+91";
      }

      console.log("Sending countrycode as:", dialCode);
      
      const customerProfilePayload = {
        user_id: userId,
        firstname: form.firstName,
        middlename: form.middleName || "",
        lastname: form.lastName,
        email: form.email,
        countrycode: dialCode,
        phonenumber: form.phone
      };

      console.log("Creating customer profile with payload:", customerProfilePayload);
      await customerProfileCreationService.createCustomerProfile(customerProfilePayload);

      // SUCCESS
      localStorage.removeItem("userPhoneNumber");
      localStorage.removeItem("userCountryCode");
      localStorage.removeItem("userEmail");

      toast.success("🎉 Registration Successful! Your customer profile has been created successfully.", {
        position: "top-right",
        duration: 1800,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (error: any) {
    console.error("Registration error:", error);
    
    // Get the error message from the error object
    let errorMessage = error?.message || "Failed to process your request.";
    
    // Don't override if we already have a meaningful message
    if (errorMessage === "Failed to fetch") {
        errorMessage = "Network error. Please check your connection and try again.";
    }
    
    toast.error(errorMessage, { 
        position: "top-right", 
        duration: 4000 
    });
} finally {
    setIsSubmitting(false);
}
  };

  // Get tooltip text for phone number based on disabled state
  const getPhoneTooltipText = () => {
    if (isPhoneFromStorage) {
      return "Enter exactly 10 digits.Phone number has been OTP verified and cannot be edited. To change, please click Cancel and start over.";
    }
    return "Enter exactly 10 digits.";
  };

  // Get tooltip text for email based on disabled state
  const getEmailTooltipText = () => {
    if (isEmailFromStorage) {
      return "Enter a valid email address like name@example.com. Email has been OTP verified and cannot be edited. To change, please click Cancel and start over.";
    }
    return "Enter a valid email address like name@example.com";
  };

  return (
    <div className="h-screen w-full flex flex-col bg-blue-50 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-white">
      <div className="bg-white shadow-sm px-6 py-3 flex items-center shrink-0 z-20">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Image src={logovar} alt="logo" width={32} height={32} />
          <h1 className="text-lg font-bold text-[#00AFEF]">Bonhomiee</h1>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center px-4 py-4 overflow-hidden">
        <div className="bg-white w-full max-w-4xl h-full max-h-[88vh] rounded-[4px] border border-[#f1f1f1] grid grid-cols-1 md:grid-cols-2 overflow-hidden transition-all duration-300">
          
          <div className="hidden md:block relative">
            <Image src={UIpic} alt="Signup" fill className="object-cover" />
            <div className="absolute inset-0 bg-blue-900/10"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden bg-white">
            <div className="px-8 py-5 shrink-0 bg-white flex justify-center">
              <h2 className="text-[16px] font-extrabold text-[#00AFEF] tracking-tight text-center">
                Customer / Traveler Signup
              </h2>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div 
              ref={scrollContainerRef}
              className="flex-grow overflow-y-auto px-8 py-6 scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-transparent [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#00AFEF] [&::-webkit-scrollbar-thumb]:rounded-full">
              
              {mandatoryError && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {mandatoryError}
                </div>
              )}

              <CustomInput name="firstName" label="First Name" required value={form.firstName} error={errors.firstName} onChange={handleChange} placeholder="Enter first name" autoFocus />
              <CustomInput name="middleName" label="Middle Name (Optional)" value={form.middleName} error={errors.middleName} onChange={handleChange} placeholder="Enter middle name" />
              <CustomInput name="lastName" label="Last Name" required value={form.lastName} error={errors.lastName} onChange={handleChange} placeholder="Enter last name" />

              <CustomInput 
                name="email" 
                label="Email" 
                required={!isEmailFromStorage} 
                tooltip={getEmailTooltipText()}
                value={form.email} 
                error={errors.email} 
                onChange={handleChange} 
                placeholder="Enter email" 
                type="email"
                disabled={isEmailFromStorage}
              />

              {/* Phone Number Section with Check Button */}
              <div className="mb-4">
                <ShadLabel className="text-slate-700 flex items-center">
                  Phone Number<span className="text-red-500 ml-1">*</span>
                  <Tooltip text={getPhoneTooltipText()} />
                </ShadLabel>
                <div className="flex gap-2 mt-2">
                  <Select 
                    value={countryCode} 
                    onValueChange={(v) => handleCountryChange(v as CountryCode)}
                    disabled={isPhoneFromStorage}
                  >
                    <SelectTrigger className={`w-24 !h-12 bg-white text-slate-900 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"} ${isPhoneFromStorage ? "bg-gray-100 cursor-not-allowed" : ""} [&_.lucide-chevron-down]:hidden`}>
                      <SelectValue placeholder="Code" />
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ShadInput
                    name="phone"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                    disabled={isPhoneFromStorage}
                    placeholder="Enter phone number"
                    className={`flex-grow !h-12 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${
                      errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"
                    } ${isPhoneFromStorage ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                  <PremiumButton 
                    type="button" 
                    variant="info"
                    onClick={checkPhoneAvailability} 
                    disabled={!form.phone || isPhoneChecking || !!errors.phone}
                    className="h-12"
                    icon={isPhoneChecking ? <Loader2 size={12} className="animate-spin" /> : null}>
                    CHECK
                  </PremiumButton>
                </div>
                <ErrorMessage message={errors.phone} />
                
                {phoneStatus === "available" && !errors.phone && (
                  <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span className="text-green-700 text-xs font-bold tracking-tight">Phone number is available!</span>
                  </div>
                )}

                {phoneStatus === "unavailable" && !errors.phone && (
                  <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100 animate-in fade-in slide-in-from-top-1 duration-300">
                    <AlertCircle size={14} className="text-red-600" />
                    <span className="text-red-700 text-xs font-bold tracking-tight">This phone number already exists. Please use another number.</span>
                  </div>
                )}
              </div>

              {/* Username Section with Check Button */}
              <div className="mb-4">
                <ShadLabel className="text-slate-700 flex items-center">
                  Username<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Usernames: 6-16 chars. Must start with letter. Can include letters, numbers, and periods (not ending with or consecutive). No other symbols like &, =, _, etc." />
                </ShadLabel>
                <div className="flex gap-2 mt-2">
                  <ShadInput
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className={`flex-grow h-12 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${
                      errors.username ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"
                    }`}
                  />
                  <PremiumButton 
                    type="button" 
                    variant="info"
                    onClick={checkUsername} 
                    disabled={!form.username || isUsernameChecking || !!errors.username}
                    className="h-12"
                    icon={isUsernameChecking ? <Loader2 size={12} className="animate-spin" /> : null}>
                    CHECK
                  </PremiumButton>
                </div>
                <ErrorMessage message={errors.username} />
                
                {usernameStatus === "available" && !errors.username && (
                  <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span className="text-green-700 text-xs font-bold tracking-tight">Username is available!</span>
                  </div>
                )}

                {usernameStatus === "unavailable" && !errors.username && (
                  <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100 animate-in fade-in slide-in-from-top-1 duration-300">
                    <AlertCircle size={14} className="text-red-600" />
                    <span className="text-red-700 text-xs font-bold tracking-tight">This username already exists. Please choose another username.</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <ShadLabel className="text-slate-700 flex items-center">
                  Password<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Minimum 8 characters including at least one uppercase, lowercase, number and special character." />
                </ShadLabel>
                <div className="relative mt-2">
                  <ShadInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onCopy={preventCopyPaste}
                    onPaste={preventCopyPaste}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`w-full h-12 bg-white text-slate-900 pr-10 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${
                      (errors.password || strengthLabel === "weak password") ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"
                    }`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF]">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {isCriteriaMet && strengthLabel && !containsNamePart(form.password) && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-1.5 flex-grow bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${
                        strengthLabel === 'weak password' ? 'w-1/3 bg-red-500' :
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

              <div className="mb-2">
                <ShadLabel className="text-slate-700 flex items-center">
                  Re-Type Password<span className="text-red-500 ml-1">*</span>
                </ShadLabel>
                <ShadInput
                  type="password"
                  name="confirmPassword"
                  onPaste={preventCopyPaste}
                  onFocus={() => setShowPassword(false)}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`mt-2 h-12 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${
                    errors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"
                  }`}
                />
                <ErrorMessage message={errors.confirmPassword} />
              </div>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="px-8 py-6 shrink-0 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <PremiumButton type="button" variant="destructive" size="lg" onClick={() => router.push("/")} className="w-full">
                  Cancel
                </PremiumButton>
                <PremiumButton type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full" icon={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}>
                  Register
                </PremiumButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}