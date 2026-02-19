"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { passwordStrength } from "check-password-strength";
import logovar from "../../assets/images/logoPrimary.png"
import UIpic from "../../assets/images/agent-signup.jpg"

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

  /* TRIVIAL PASSWORD CHECKER */
  const isTrivialPassword = (p: string) => {
    const lowerP = p.toLowerCase();
    const commonSequences = ["12345678", "abcdefgh", "qwerty"];
    const nameParts = [form.agencyName, form.firstName, form.lastName].filter(Boolean).map(n => n.toLowerCase());
    
    const containsName = nameParts.some(name => lowerP.includes(name));
    const isSequential = commonSequences.some(seq => lowerP.includes(seq));
    const startsTrivial = lowerP.startsWith("aa@");

    return containsName || isSequential || startsTrivial;
  };

  /* PASSWORD STRENGTH LOGIC */
  useEffect(() => {
    if (!form.password) {
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
  }, [form.password, form.agencyName, form.firstName, form.lastName]);

  const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const phoneValid = (p: string) => /^[0-9]{10}$/.test(p);
  const usernameValid = (u: string) => /^[a-zA-Z0-9@_.-]{4,30}$/.test(u);
  const passwordValidCriteria = (p: string) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(p);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setMandatoryError("");
    
    if (name === "username") {
      setUsernameStatus(null);
    }

    let fieldError = "";
    if (name === "email" && value && !emailValid(value)) fieldError = "Please enter a valid email address.";
    if (name === "phone" && value && !phoneValid(value)) fieldError = "Phone number must be exactly 10 digits.";
    if (name === "password" && value && (!passwordValidCriteria(value) || isTrivialPassword(value))) fieldError = "Password criteria not fulfilled yet.";
    if (name === "confirmPassword" && value !== form.password) fieldError = "The passwords you entered do not match.";

    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const generateUsername = () => {
    if (!form.agencyName) return;
    const cleanAgency = form.agencyName.replace(/\s+/g, "").slice(0, 10);
    const timestamp = Date.now();
    const newUsername = `${cleanAgency}@${timestamp}`;
    setForm(prev => ({ ...prev, username: newUsername }));
    setUsernameStatus(null);
  };

  const checkUsername = () => {
    if (!form.username) return;
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      if (form.username.toLowerCase().includes("taken")) {
        setUsernameStatus("unavailable");
      } else {
        setUsernameStatus("available");
      }
    }, 1200);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.agencyName || !form.firstName || !form.lastName || !form.email || !form.phone || !form.username || !form.password || !form.confirmPassword) {
      setMandatoryError("Kindly fill-up all the mandatory fields ( marked with * ) for a successful registration");
      return;
    }

    if (usernameStatus !== "available") {
      setMandatoryError("Please check and verify a unique username before registering.");
      return;
    }

    let newErrors: ErrorState = {};
    if (strengthLabel === "weak password") {
        newErrors.password = "A Medium or Strong password is required to continue.";
    }
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "The passwords you entered do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Registration successful!");
    router.push("/");
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
        {/* GUIDELINE 10, 11, 12: Form radius 4px, border 1px solid #f1f1f1, No shadow */}
        <div className="bg-white w-full max-w-4xl h-full max-h-[88vh] rounded-[4px] border border-[#f1f1f1] grid grid-cols-2 overflow-hidden">

          <div className="hidden md:block relative">
            <Image src={UIpic} alt="Agent Signup" fill className="object-cover"/>
            <div className="absolute inset-0 bg-blue-900/10"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden bg-white">
            {/* GUIDELINE 6: Heading color #00AFEF */}
            <div className="px-8 py-5 shrink-0 bg-white">
              <h2 className="text-2xl font-extrabold text-[#00AFEF] tracking-tight">Agent / Agency Signup</h2>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="flex-grow overflow-y-auto px-8 py-6 
              scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-blue-300
              [&::-webkit-scrollbar-thumb]:rounded-full">

              {mandatoryError && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2 animate-in zoom-in-95">
                  <AlertCircle size={16} />
                  {mandatoryError}
                </div>
              )}

              <div className="mb-4">
                {/* GUIDELINE 1 & 2: Font size 12px, color #1A1A1A */}
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
                  Agency Name<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-2 mt-1">
                  {/* GUIDELINE 3 & 8: Border radius 4px, border color #00AFEF */}
                  <input name="agencyName" value={form.agencyName} onChange={handleChange} placeholder="Enter agency name"
                    className="flex-grow border border-[#00AFEF] rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF]"/>
                  {/* GUIDELINE 4: Generate button Primary color #00AFEF */}
                  <button type="button" onClick={generateUsername} disabled={!form.agencyName}
                    className="bg-[#00AFEF] text-white px-4 py-2 rounded-[4px] text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider">
                    Generate
                  </button>
                </div>
              </div>

              <InputField label="First Name" name="firstName" placeholder="Enter first name" required form={form} handleChange={handleChange}/>
              <InputField label="Middle Name" name="middleName" placeholder="Enter middle name" form={form} handleChange={handleChange}/>
              <InputField label="Last Name" name="lastName" placeholder="Enter last name" required form={form} handleChange={handleChange}/>

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
                    className="w-full border border-[#00AFEF] border-l-0 rounded-r-[4px] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#00AFEF]"/>
                </div>
                <ErrorMessage message={errors.phone} />
              </div>

              <div className="mb-4">
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
                  Username<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Must start with a letter, followed by underscores or numbers. 6–16 characters allowed.Check availability after generating or typing"/>
                </label>
                <div className="flex gap-2 mt-1">
                  <input name="username" value={form.username} onChange={handleChange} placeholder="Enter or generate username"
                    className="flex-grow border border-[#00AFEF] rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF]"/>
                  {/* GUIDELINE 4: Check button Primary color #00AFEF */}
                  <button type="button" onClick={checkUsername} disabled={!form.username || isChecking}
                    className="bg-[#00AFEF] text-white px-4 py-2 rounded-[4px] text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1">
                    {isChecking ? <Loader2 size={12} className="animate-spin" /> : "CHECK"}
                  </button>
                </div>
                {usernameStatus === "available" && (
                  <p className="text-green-600 text-xs font-bold mt-1.5 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <CheckCircle2 size={14} /> Username is available!
                  </p>
                )}
                {usernameStatus === "unavailable" && (
                  <p className="text-red-600 text-xs font-bold mt-1.5 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <AlertCircle size={14} /> This username is already taken.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
                  Password<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Minimum 8 characters including at least one uppercase, lowercase, number and special character"/>
                </label>
                <div className="relative mt-1">
                  <input type={showPassword ? "text" : "password"} name="password"
                    onCopy={preventCopyPaste} onCut={preventCopyPaste} onPaste={preventCopyPaste}
                    value={form.password} onChange={handleChange} placeholder="Enter password"
                    className="w-full border border-[#00AFEF] rounded-[4px] px-3 py-2 pr-10 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF]"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF] transition-colors">
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                {strengthLabel && (
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
                  onCopy={preventCopyPaste} onCut={preventCopyPaste} onPaste={preventCopyPaste}
                  value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password"
                  className="w-full border border-[#00AFEF] rounded-[4px] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#00AFEF] mt-1"/>
                <ErrorMessage message={errors.confirmPassword} />
              </div>

              <InputField label="Website (Optional)" name="website" placeholder="Enter agency website URL" form={form} handleChange={handleChange}/>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="px-8 py-6 shrink-0 bg-white">
              <div className="grid grid-cols-2 gap-4">
                {/* GUIDELINE 9: Tertiary color #E62800, white text */}
                <button type="button" onClick={()=>router.push("/")} 
                  className="w-full bg-[#E62800] text-white font-bold py-2.5 rounded-[4px] transition-all active:scale-95">
                  Cancel
                </button>
                {/* GUIDELINE 4: Register Primary action color #00AFEF */}
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
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({label,name,required,placeholder,form,handleChange}:InputFieldProps) => (
  <div className="mb-4">
    {/* GUIDELINE 1 & 2: Font size 12px, color #1A1A1A */}
    <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {/* GUIDELINE 3 & 8: Border radius 4px, border color #00AFEF */}
    <input name={name} value={form[name as keyof FormState]} onChange={handleChange} placeholder={placeholder}
      className="w-full border border-[#00AFEF] rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] mt-1"/>
  </div>
);

interface InputWithErrorProps extends InputFieldProps {
  tooltip?: string;
  errors: ErrorState;
}

const InputWithError = ({label,name,required,placeholder,tooltip,form,handleChange}:InputWithErrorProps) => (
  <div>
    <label className="font-medium text-[12px] text-[#1A1A1A] flex items-center">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
      {/* GUIDELINE 5: Tooltip icon color #00AFEF */}
      {tooltip && <Tooltip text={tooltip}/>}
    </label>
    <input name={name} value={form[name as keyof FormState]} onChange={handleChange} placeholder={placeholder}
      className="w-full border border-[#00AFEF] rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] mt-1"/>
  </div>
);