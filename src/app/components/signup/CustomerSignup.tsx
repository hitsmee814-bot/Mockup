"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { passwordStrength } from "check-password-strength";
import logovar from "../../assets/images/logoPrimary.png"
import UIpic from "../../assets/images/traveling-concept-with-landmarks.jpg"

/* Using full metadata for strict validation */
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
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  required,
  tooltip,
  placeholder,
  value,
  error,
  onChange,
}) => (
  <div className="mb-4">
    <label className="font-medium text-[12px] flex items-center text-[#1A1A1A]">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && <Tooltip text={tooltip} />}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 mt-1 ${
        error ? "border-red-500 ring-1 ring-red-500" : "border-[#00AFEF] focus:ring-[#00AFEF]"
      }`}
    />
    <ErrorMessage message={error} />
  </div>
);

export default function CustomerSignup(): JSX.Element {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    if (!basicRegex.test(e)) return false;
    const parts = e.split('@');
    const domainPart = parts[1].split('.')[0];
    return domainPart === domainPart.toLowerCase() && /^[a-zA-Z0-9]+$/.test(domainPart);
  };

  const validatePhoneNumber = (p: string, country: CountryCode) => {
    if (!p) return "";
    if (!/^[0-9]{10}$/.test(p)) return "Phone number must be exactly 10 digits.";
    if (country === "IN" && !/^[6-9]\d{9}$/.test(p)) return "Enter valid phone number";
    const phoneNumber = parsePhoneNumberFromString(p, country);
    if (!phoneNumber || !phoneNumber.isValid()) return "Enter valid phone number";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") setShowPassword(false);

    setForm(prev => ({ ...prev, [name]: value }));
    setMandatoryError("");

    let fieldError = "";
    
    if (name === "email" && value && !emailValid(value)) fieldError = "Please enter a valid email address.";
    if (name === "phone" && value) fieldError = validatePhoneNumber(value, countryCode);
    
    if (name === "username") {
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

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value as CountryCode;
    setCountryCode(newCode);
    if (form.phone) {
      setErrors(prev => ({ ...prev, phone: validatePhoneNumber(form.phone, newCode) }));
    }
  };

  const preventCopyPaste = (e: React.ClipboardEvent) => { e.preventDefault(); };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      setMandatoryError("Kindly fill-up all the mandatory fields ( marked with * ) correctly for a successful registration");
      
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setTimeout(() => {
      alert("Registered successfully");
      router.push("/");
    }, 1200);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-blue-50 overflow-hidden">
      <div className="bg-white shadow-sm px-6 py-3 flex items-center shrink-0 z-20">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Image src={logovar} alt="logo" width={32} height={32} />
          <h1 className="text-lg font-bold text-[#00AFEF]">Bonhomiee</h1>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center px-4 py-4 overflow-hidden">
        <div className="bg-white w-full max-w-4xl h-full max-h-[88vh] rounded-[4px] border border-[#f1f1f1] grid grid-cols-2 overflow-hidden">
          
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
              className="flex-grow overflow-y-auto px-8 py-6 
              scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-transparent
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#00AFEF]
              [&::-webkit-scrollbar-thumb]:rounded-full">
              
              {mandatoryError && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {mandatoryError}
                </div>
              )}

              <Input name="firstName" label="First Name" required value={form.firstName} error={errors.firstName} onChange={handleChange} placeholder="Enter first name" />
              <Input name="middleName" label="Middle Name (Optional)" value={form.middleName} error={errors.middleName} onChange={handleChange} placeholder="Enter middle name" />
              <Input name="lastName" label="Last Name" required value={form.lastName} error={errors.lastName} onChange={handleChange} placeholder="Enter last name" />

              <Input name="email" label="Email" required tooltip="Enter a valid email address" value={form.email} error={errors.email} onChange={handleChange} placeholder="Enter email" />

              <div className="mb-4">
                <label className="font-medium text-[12px] flex items-center text-[#1A1A1A] mb-1">
                  Phone Number<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Enter exactly 10 digits." />
                </label>
                <div className="flex">
                  <select 
                    value={countryCode}
                    onChange={handleCountryChange}
                    className="border border-[#00AFEF] rounded-l-[4px] px-2 text-[12px] text-[#1A1A1A] bg-gray-50 outline-none">
                    <option value="IN">🇮🇳 +91</option>
                    <option value="US">🇺🇸 +1</option>
                    <option value="GB">🇬🇧 +44</option>
                  </select>
                  <input
                    name="phone"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={`w-full border border-l-0 rounded-r-[4px] px-3 py-2 text-sm outline-none focus:ring-1 transition-all ${
                      errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-[#00AFEF] focus:ring-[#00AFEF]"
                    }`}
                  />
                </div>
                <ErrorMessage message={errors.phone} />
              </div>

              <Input 
                name="username" 
                label="Username" 
                required 
                tooltip="Usernames: 6-16 chars. Must start with letter. Can include letters, numbers, and periods (not ending with or consecutive). No other symbols like &, =, _, etc." 
                value={form.username} 
                error={errors.username} 
                onChange={handleChange} 
                placeholder="Enter username" 
              />

              <div className="mb-4">
                <label className="font-medium text-[12px] flex items-center text-[#1A1A1A]">
                  Password<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Minimum 8 characters including at least one uppercase, lowercase, number and special character." />
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onCopy={preventCopyPaste}
                    onPaste={preventCopyPaste}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`w-full border rounded-[4px] px-3 py-2 pr-10 text-sm outline-none transition-all focus:ring-1 ${
                      (errors.password || strengthLabel === "weak password") ? "border-red-500 ring-1 ring-red-500" : "border-[#00AFEF] focus:ring-[#00AFEF]"
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
                <label className="font-medium text-[12px] flex items-center text-[#1A1A1A]">
                  Re-Type Password<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  onPaste={preventCopyPaste}
                  onFocus={() => setShowPassword(false)}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full border rounded-[4px] px-3 py-2 text-sm outline-none focus:ring-1 mt-1 ${
                    errors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : "border-[#00AFEF] focus:ring-[#00AFEF]"
                  }`}
                />
                <ErrorMessage message={errors.confirmPassword} />
              </div>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="px-8 py-6 shrink-0 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => router.push("/")}
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