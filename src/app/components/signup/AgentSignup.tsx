"use client";

import React, { useState, useEffect, useLayoutEffect, ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { passwordStrength } from "check-password-strength";
import logovar from "../../assets/images/logoPrimary.png";
import UIpic from "../../assets/images/agent-signup.jpg";
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { PremiumButton } from "../../utils/PremiumButton";

/* SERVICE IMPORTS */
import { phoneNoService } from "@/services/phoneNoService";
import { phoneNumberAvailService } from "@/services/phoneNumberAvailService";
import { userNameService } from "@/services/userNameService";

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

/* ---------------- TYPES ---------------- */

interface FormState {
  agencyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryCode: string;
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

/* ---------------- CONSTANTS ---------------- */
const INPUT_STYLING = "mt-2 h-12 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]";
const LABEL_STYLING = "text-slate-700";

/* ---------------- MODERN TOOLTIP ---------------- */

const Tooltip = ({ text }: { text: string }) => (
  <div className="relative group inline-block ml-2">
    <span className="text-[#00AFEF] text-xs cursor-help">ⓘ</span>
    <div className="
      absolute bottom-full left-0 mb-2
      hidden group-hover:block z-50
      min-w-[240px] max-w-[300px]
      bg-gray-900 text-white text-xs
      px-3 py-2 rounded-lg shadow-lg
      whitespace-normal break-words
      leading-relaxed
    ">
      {text}
    </div>
  </div>
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
      {/* Circles */}
      <div className="flex items-center w-full">
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 1 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
        <div className="flex-1 h-[1px] bg-gray-300 mx-2" />
        <div className={`h-2.5 w-2.5 rounded-full ${step === 2 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
      </div>

      {/* Labels */}
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

  const [form, setForm] = useState<FormState>({
    agencyName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
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
  

  const [documents, setDocuments] = useState<File[]>([]);
const [docError, setDocError] = useState("");
 const [countries, setCountries] = useState<CountryOption[]>([]);

  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  /* Fetch Phone Codes on Mount */
  useEffect(() => {
  const fetchCodes = async () => {
    try {
      const response = await phoneNoService.getPhoneCodes();

      if (response?.data) {
        const parsed = response.data.map((item: any) => ({
        code: item.phone_code,
        iso2: item.iso2,
        label: `${item.iso2} ${item.phone_code}`,
      }));

      //  Move IN +91 to top
      const sorted = parsed.sort((a: CountryOption, b: CountryOption) => {
        if (a.iso2 === "IN") return -1;
        if (b.iso2 === "IN") return 1;
        return 0;
      });

        setCountries(sorted);
      }
    } catch {
      console.warn("Using fallback country code");

      setCountries([
      { code: "+91", iso2: "IN", label: "IN +91" }
      ]);
    }
  };

  fetchCodes();
}, []);
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

  const validatePhoneNumber = (p: string, countryCode: string) => {
  if (!p) return "";

  const fullNumber = `${countryCode}${p}`;

  try {
    const phoneNumber = parsePhoneNumberFromString(fullNumber);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Enter valid phone number";
    }

  } catch {
    return "Enter valid phone number";
  }

  return "";
};

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleValueChange(name, value);
  };

  const handleValueChange = (name: string, value: string) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    setMandatoryError("");
    if (name === "username") setUsernameStatus(null);
    if (name === "phone") setPhoneStatus(null);
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
      if (name === "email") {
        const validation = emailValid(value);
        if (!validation.valid) {
          fieldError = validation.errorType === "casing"
            ? "Email domain must be in lowercase"
            : "Please enter a valid email address";
        }
      }
      if (name === "phone") {
        fieldError = validatePhoneNumber(value, updatedForm.countryCode);
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
  };

  const checkUsername = async () => {
  if (!form.username || errors.username) return;

  setIsCheckingUser(true);
  setUsernameStatus(null);

  try {
    const res = await userNameService.checkAvailability(form.username);

    if (res?.data?.available === "test") {
      setUsernameStatus("unavailable");
    } else {
      setUsernameStatus("available");
    }

  } catch {
    setUsernameStatus("available");
  } finally {
    setIsCheckingUser(false);
  }
};

  const checkPhone = async () => {
  if (!form.phone || errors.phone) return;

  setIsCheckingPhone(true);
  setPhoneStatus(null);

  try {
    const res = await phoneNumberAvailService.checkAvailability(form.phone);

    if (res?.data?.available === true) {
      setPhoneStatus("available");
    } else {
      setPhoneStatus("available");
    }

  } catch {
    setPhoneStatus("available");
  } finally {
    setIsCheckingPhone(false);
  }
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
    setMandatoryError("Kindly fill-up all the mandatory fields correctly to proceed to next step");

    const newErrors = { ...errors };
    emptyFields.forEach(f => newErrors[f] = "Required");

    setErrors(newErrors);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  //  AUTO CHECK
  if (!usernameStatus) await checkUsername();
  if (!phoneStatus) await checkPhone();

  setCurrentStep(2);
};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (documents.length === 0) {
    setDocError("Please upload required documents to proceed");
    return;
  }

  setDocError("");

  alert("Registered successfully");
  router.push("/");
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
              
              {/* Step Indicator Labels */}
              <StepIndicator step={currentStep as 1 | 2} />
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto px-8 py-6 
              scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-transparent
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#00AFEF]
              [&::-webkit-scrollbar-thumb]:rounded-full">

              {mandatoryError && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2 animate-in zoom-in-95">
                  <AlertCircle size={16} />
                  {mandatoryError}
                </div>
              )}

              {currentStep === 1 ? (
                /* STEP 1: GENERAL */
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

                  <div className="mb-4">
                    <InputWithError label="Email" name="email" placeholder="Enter email address" required tooltip="Enter a valid email address like name@example.com" form={form} errors={errors} handleChange={handleChange} />
                    <ErrorMessage message={errors.email} />
                  </div>

                  <div className="mb-4">
                    <Label className={`${LABEL_STYLING} flex items-center`}>
                      Phone Number<span className="text-red-500 ml-1">*</span>
                      <Tooltip text="Enter exactly 10 digits." />
                    </Label>
                    <div className="flex gap-3 items-center">
                      <div className="mt-2 w-[90px] shrink-0">
                        <Select
                          value={form.countryCode}
                          onValueChange={(val) => handleValueChange("countryCode", val)}
                        >
                          <SelectTrigger className={`w-full !h-12 bg-white text-slate-900 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"}`}>
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent className="bg-white max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00AFEF]">
                            {countries.map((c) => (
                              <SelectItem key={`${c.iso2}-${c.code}`} value={c.code}>
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className={`${INPUT_STYLING} flex-grow ${errors.phone ? 'border-red-600' : ''}`}
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
                    
                    {phoneStatus === "available" && !errors.phone && (
                      <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="text-green-700 text-xs font-bold tracking-tight">Phone number is available !</span>
                      </div>
                    )}

                    
                  </div>

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
                    
                    {usernameStatus === "available" && !errors.username && (
                      <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="text-green-700 text-xs font-bold tracking-tight">Username is available !</span>
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
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-[#00AFEF]">
                     <Upload className="text-[#00AFEF]" size={28} />
                  </div>
                  <h3 className="text-slate-800 font-bold text-lg mb-2">Upload Agency Documents</h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-xs">Please upload your business registration and identity proof (PDF, JPG up to 5MB).</p>
                  
                  <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-8 hover:border-[#00AFEF] transition-colors cursor-pointer group bg-slate-50/50">
                    <input
  type="file"
  className="hidden"
  id="doc-upload"
  multiple
  onChange={(e) => {
    const files = e.target.files;
    if (files) {
      setDocuments(Array.from(files));
      setDocError("");
    }
  }}
/>
                    {docError && (
  <div className="mt-3 text-red-600 text-sm flex items-center gap-2">
    <AlertCircle size={14} />
    {docError}
  </div>
)}
                    <label htmlFor="doc-upload" className="cursor-pointer">
                      <span className="text-[#00AFEF] font-semibold group-hover:underline">Click to upload</span>
                      <span className="text-slate-500 ml-1">or drag and drop files here</span>
                    </label>
                  </div>
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
                    variant="destructive"
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
                  >
                    Register
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

interface InputWithErrorProps extends InputFieldProps {
  tooltip?: string;
}

const InputWithError = ({ label, name, required, placeholder, tooltip, form, errors, handleChange }: InputWithErrorProps) => (
  <div>
    <Label className={`${LABEL_STYLING} flex items-center`}>
      {label}{required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && <Tooltip text={tooltip} />}
    </Label>
    <Input
      name={name}
      value={form[name as keyof FormState]}
      onChange={handleChange}
      placeholder={placeholder}
      className={`${INPUT_STYLING} ${errors[name] ? 'border-red-600' : ''}`}
    />
  </div>
);