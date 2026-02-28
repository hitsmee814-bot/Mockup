"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { passwordStrength } from "check-password-strength";
import logovar from "../../assets/images/logoPrimary.png"
import UIpic from "../../assets/images/agent-signup.jpg"
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

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

export default function AgentSignup(): JSX.Element {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
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
  
  const [isChecking, setIsChecking] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<"available" | "unavailable" | null>(null);

  /* PREVENT COPY PASTE LOGIC */
  const preventCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  /* NAME IN PASSWORD CHECK */
  const isNameInPassword = (p: string, currentForm: FormState) => {
    const lowerP = p.toLowerCase();
    const nameParts = [currentForm.firstName, currentForm.middleName, currentForm.lastName, currentForm.agencyName]
      .filter(Boolean)
      .map(n => n.toLowerCase());
    return nameParts.some(name => name.length > 0 && lowerP.includes(name));
  };

  /* REFINED TRIVIAL SEQUENCE DETECTION */
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

  /* PASSWORD STRENGTH LOGIC */
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
    
    // Check for uppercase characters in domain
    if (/[A-Z]/.test(domainPart)) {
        return { valid: false, errorType: "casing" };
    }

    // Check for special characters in domain (only lowercase letters and numbers allowed)
    if (!/^[a-z0-9]+$/.test(domainPart)) {
        return { valid: false, errorType: "syntax" };
    }

    return { valid: true, errorType: "" };
  };

  const validatePhoneNumber = (p: string, country: string) => {
    if (!p) return "";
    if (!/^[0-9]{10}$/.test(p)) return "Phone number must be exactly 10 digits.";
    const countryMap: Record<string, CountryCode> = { "+91": "IN", "+1": "US", "+44": "GB" };
    const isoCountry = countryMap[country] || (country as CountryCode);
    if (isoCountry === "IN" && !/^[6-9]\d{9}$/.test(p)) return "Enter valid phone number";
    const phoneNumber = parsePhoneNumberFromString(p, isoCountry);
    if (!phoneNumber || !phoneNumber.isValid()) return "Enter valid phone number";
    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    
    setMandatoryError("");
    if (name === "username") setUsernameStatus(null);
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

  const checkUsername = () => {
    if (!form.username || errors.username) return;
    setIsChecking(true);
    return new Promise((resolve) => {
        setTimeout(() => {
            setIsChecking(false);
            const status = form.username.toLowerCase().includes("taken") ? "unavailable" : "available";
            setUsernameStatus(status);
            resolve(status);
        }, 1200);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mandatoryFields: (keyof FormState)[] = ["agencyName", "firstName", "lastName", "email", "phone", "username", "password", "confirmPassword"];
    const emptyFields = mandatoryFields.filter(f => !form[f]);
    const hasInvalidFields = Object.values(errors).some(error => error !== "" && error !== "Required");

    if (emptyFields.length > 0 || hasInvalidFields || strengthLabel === "weak password") {
      setMandatoryError("Kindly fill-up all the mandatory fields correctly for a successful registration");
      
      const newFieldErrors: ErrorState = { ...errors };
      emptyFields.forEach(f => { 
        newFieldErrors[f] = "Required"; 
      });
      
      if (strengthLabel === "weak password" && !newFieldErrors.password) {
        newFieldErrors.password = "A Medium or Strong password is required to continue.";
      }
      
      setErrors(newFieldErrors);
      if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    let currentStatus = usernameStatus;
    if (currentStatus === null) {
      currentStatus = await checkUsername() as "available" | "unavailable";
    }

    if (currentStatus !== "available") {
      setMandatoryError("Please check and verify a unique username before registering.");
      if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setTimeout(() => {
      alert("Registered successfully");
      router.push("/");
    }, 2000);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-blue-50 overflow-hidden">
      <div className="bg-white shadow-sm px-6 py-3 flex items-center shrink-0 z-20">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Image src={logovar} alt="logo" width={32} height={32}/>
          <h1 className="text-lg font-bold text-[#00AFEF]">Bonhomiee</h1>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center px-4 py-4 overflow-hidden">
        <div className="bg-white w-full max-w-4xl h-full max-h-[88vh] rounded-[4px] border border-[#f1f1f1] grid grid-cols-2 overflow-hidden">

          <div className="hidden md:block relative">
            <Image src={UIpic} alt="Agent Signup" fill className="object-cover"/>
            <div className="absolute inset-0 bg-blue-900/10"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden bg-white">
            <div className="px-8 py-5 shrink-0 bg-white flex justify-center">
              <h2 className="text-[16px] font-extrabold text-[#00AFEF] tracking-tight text-center">
                Agent / Agency Signup
              </h2>
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

              <div className="mb-4">
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
                  Agency Name<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-2 mt-1">
                  <input name="agencyName" value={form.agencyName} onChange={handleChange} placeholder="Enter agency name"
                    className={`flex-grow border rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] ${errors.agencyName ? 'border-red-600' : 'border-[#00AFEF]'}`}/>
                  <button type="button" onClick={generateUsername} disabled={!form.agencyName}
                    className="bg-[#00AFEF] text-white px-4 py-2 rounded-[4px] text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider">
                    Generate
                  </button>
                </div>
                <ErrorMessage message={errors.agencyName} />
              </div>

              <InputField label="First Name" name="firstName" placeholder="Enter first name" required form={form} errors={errors} handleChange={handleChange}/>
              <InputField label="Middle Name (Optional)" name="middleName" placeholder="Enter middle name" form={form} errors={errors} handleChange={handleChange}/>
              <InputField label="Last Name" name="lastName" placeholder="Enter last name" required form={form} errors={errors} handleChange={handleChange}/>

              <div className="mb-4">
                <InputWithError label="Email" name="email" placeholder="Enter email address" required tooltip="Enter a valid email address like name@example.com" form={form} errors={errors} handleChange={handleChange}/>
                <ErrorMessage message={errors.email} />
              </div>

              <div className="mb-4">
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center mb-1">
                  Phone Number<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Enter exactly 10 digits."/>
                </label>
                <div className="flex">
                  <select name="countryCode" value={form.countryCode} onChange={handleChange}
                    className="border border-[#00AFEF] rounded-l-[4px] px-2 text-[12px] text-[#1A1A1A] bg-gray-50 outline-none">
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number"
                    className={`w-full border border-l-0 rounded-r-[4px] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#00AFEF] ${errors.phone ? 'border-red-600' : 'border-[#00AFEF]'}`}/>
                </div>
                <ErrorMessage message={errors.phone} />
              </div>

              <div className="mb-4">
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
                  Username<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Usernames: 6-16 chars. Must start with letter. Can include letters, numbers, and periods (not ending with or consecutive). No other symbols like &, =, _, etc."/>
                </label>
                <div className="flex gap-2 mt-1">
                  <input name="username" value={form.username} onChange={handleChange} placeholder="Enter or generate username"
                    className={`flex-grow border rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] ${errors.username ? 'border-red-600' : 'border-[#00AFEF]'}`}/>
                  <button type="button" onClick={checkUsername} disabled={!form.username || isChecking || !!errors.username}
                    className="bg-[#00AFEF] text-white px-4 py-2 rounded-[4px] text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1">
                    {isChecking ? <Loader2 size={12} className="animate-spin" /> : "CHECK"}
                  </button>
                </div>
                <ErrorMessage message={errors.username} />
                {usernameStatus === "available" && !errors.username && (
                  <p className="text-green-600 text-xs font-bold mt-1.5 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <CheckCircle2 size={14} /> Username is available!
                  </p>
                )}
                {usernameStatus === "unavailable" && !errors.username && (
                  <p className="text-red-600 text-xs font-bold mt-1.5 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <AlertCircle size={14} /> This username is already taken.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
                  Password<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Minimum 8 characters including at least one uppercase, lowercase, number and special character."/>
                </label>
                <div className="relative mt-1">
                  <input type={showPassword ? "text" : "password"} name="password"
                    onCopy={preventCopyPaste} onCut={preventCopyPaste} onPaste={preventCopyPaste}
                    value={form.password} onChange={handleChange} placeholder="Enter password"
                    className={`w-full border rounded-[4px] px-3 py-2 pr-10 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] ${errors.password ? 'border-red-600' : 'border-[#00AFEF]'}`}/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF] transition-colors">
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                
                {strengthLabel && !errors.password && (
                  <div className="mt-2.5 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-500">
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

              <div className="mb-4">
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
                    Re-Type Password<span className="text-red-500 ml-1">*</span>
                </label>
                <input type="password" name="confirmPassword"
                  onFocus={() => setShowPassword(false)}
                  onCopy={preventCopyPaste} onCut={preventCopyPaste} onPaste={preventCopyPaste}
                  value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password"
                  className={`w-full border rounded-[4px] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#00AFEF] mt-1 ${errors.confirmPassword ? 'border-red-600' : 'border-[#00AFEF]'}`}/>
                <ErrorMessage message={errors.confirmPassword} />
              </div>

              <InputField label="Website (Optional)" name="website" placeholder="Enter agency website URL" form={form} errors={errors} handleChange={handleChange}/>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="px-8 py-6 shrink-0 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={()=>router.push("/")} 
                  className="w-full bg-[#E62800] text-white font-bold py-2.5 rounded-[4px] transition-all active:scale-95">
                  Cancel
                </button>
                <button type="submit" 
                  className="w-full bg-[#00AFEF] text-white font-bold py-2.5 rounded-[4px] transition-all active:scale-95">
                  Register
                </button>
              </div>
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

const InputField = ({label,name,required,placeholder,form,errors,handleChange}:InputFieldProps) => (
  <div className="mb-4">
    <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input name={name} value={form[name as keyof FormState]} onChange={handleChange} placeholder={placeholder}
      className={`w-full border rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] mt-1 ${errors[name] ? 'border-red-600' : 'border-[#00AFEF]'}`}/>
    <ErrorMessage message={errors[name]} />
  </div>
);

interface InputWithErrorProps extends InputFieldProps {
  tooltip?: string;
}

const InputWithError = ({label,name,required,placeholder,tooltip,form,errors,handleChange}:InputWithErrorProps) => (
  <div>
    <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && <Tooltip text={tooltip}/>}
    </label>
    <input name={name} value={form[name as keyof FormState]} onChange={handleChange} placeholder={placeholder}
      className={`w-full border rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] mt-1 ${errors[name] ? 'border-red-600' : 'border-[#00AFEF]'}`}/>
  </div>
);