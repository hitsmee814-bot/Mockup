'use client'

    /* ================= IMPORTS ================= */
import React,{ useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'react-tooltip'
import Image from "next/image";
import logo from "../../../assets/images/logoPrimary.png"
import supplierPic from "../../../assets/images/traveling-concept-with-landmarks.jpg"
import { Input as ShadInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PremiumButton } from "../../../utils/PremiumButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { phoneNoService } from "@/services/phoneNoService";
import { phoneNumberAvailService } from "@/services/phoneNumberAvailService";
import { CountryCodeCombobox } from "../../login/CountryCodeCombobox";
import { userCreationService } from "@/services/userCreationService";
import { supplierProfileCreationService } from "@/services/supplierProfileCreationService";

import {
  validateEmail,
  validatePhone,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateWebsiteLive
} from "./supplierSignupValidation"
import {
  validateStep1,
  validateStep2,
  validateStep3
} from "./supplierSignupValidation"
import SupplierDocuments from "./SupplierDocuments"
import ServiceTypeSelect from "./ServiceTypeSelect"
import { countryListService } from "@/services/countryListService";
import { docTypelookupService } from "@/services/docTypes";
import { userNameService } from "@/services/userNameService";

/* ================= TYPES ================= */
type NamedDocument = {
  file: File
  name: string
  identifier?: string   
}

type TooltipIconProps = {
  id: string
  content: string
}

type FormData = {
  firstName: string
  middleName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  username: string
  password: string
  confirmPassword: string
  supplierLegalName: string
  tradeName: string
  serviceTypes: string[]
  countryOfRegistration: string
  panTaxId: string
  websiteUrl: string
  tradeLicense: File | null
  registrationCert: File | null
  taxDocType: string
  taxRegistrationDoc: File | null
  otherDocs: NamedDocument[]
  tradeLicenseNumber: string
  compRegistrationNumber: string 

}

/* ================= CONSTANTS ================= */    
  
  const blockClipboard = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault()
    }

    const blockContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
     e.preventDefault()
    }

 const labelClass = "text-[12px] font-medium text-[#1A1A1A]"; 

  
const errorTextClass = "text-[11px] font-semibold text-red-600";
const inputTextClass = "text-[12px] text-black";
const placeholderClass = "placeholder:text-[12px] placeholder:text-gray-400";
const inputClass = `h-[38px] w-full rounded border border-[#00AFEF] bg-white px-3 
   ${inputTextClass} ${placeholderClass} focus:outline-none`;
const dropdownInputClass =
  `${inputClass} flex items-center justify-between cursor-pointer`

/* ================= STEP INDICATOR ================= */
function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="w-full mb-4">
      {/* Circles */}
      <div className="flex items-center w-full">
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 1 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
        <div className="flex-1 h-[1px] bg-gray-300 mx-2" />
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 2 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
        <div className="flex-1 h-[1px] bg-gray-300 mx-2" />
        <div className={`h-2.5 w-2.5 rounded-full ${step === 3 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[12px] text-gray-600 mt-1">
        <span className={step === 1 ? 'font-semibold text-[#00AFEF]' : ''}>
          General
        </span>
        <span className={step === 2 ? 'font-semibold text-[#00AFEF]' : ''}>
          Supplier Details
        </span>
        <span className={step === 3 ? 'font-semibold text-[#00AFEF]' : ''}>
          Documents
        </span>
      </div>
    </div>
  )
}



function ErrorMessage({ message }: { message?: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const fieldRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!ref.current) return

    // Locate related field
    const container = ref.current.previousElementSibling
    const field =
      container?.querySelector?.('input, select, textarea') ||
      (container as HTMLElement)

    if (!(field instanceof HTMLElement)) return

    fieldRef.current = field

    if (message) {
      // Apply error style
      field.classList.add('border-red-500')
      field.classList.remove('border-[#00AFEF]')
    } else {
      // Restore normal style
      field.classList.remove('border-red-500')
      field.classList.add('border-[#00AFEF]')
    }
  }, [message])

  return (
    <p
      ref={ref}
      className={`mt-1 flex items-center gap-1 text-[11px] font-semibold
        ${message ? 'text-red-600' : 'hidden'}`}
    >
      <AlertCircle size={12} className="shrink-0" />
      <span>{message}</span>
    </p>
  )
}

const FormErrorBanner = ({ message }: { message?: string }) => {
  if (!message) return null

  return (
    <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2">
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  )
}

function PasswordStrengthMeter({
  strength,
}: {
  strength: { id: number; value: string } | null
}) {
  if (!strength) return null

  const config = [
    {
      width: 'w-1/4',
      bar: 'bg-red-400',
      text: 'text-red-600',
      message: 'Password too weak',
    },
    {
      width: 'w-1/2',
      bar: 'bg-orange-400',
      text: 'text-orange-600',
      message: 'Password stength weak',
    },
    {
      width: 'w-3/4',
      bar: 'bg-yellow-400',
      text: 'text-yellow-600',
      message: 'Password stength medium',
    },
    {
      width: 'w-full',
      bar: 'bg-green-400',
      text: 'text-green-600',
      message: 'Password stength strong',
    },
  ]

  const level = config[strength.id] ?? config[0]

  return (
    <div className="mt-2">
      {/* STRENGTH BAR */}
      <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
        <div
          className={`h-full ${level.width} ${level.bar} transition-all duration-500 ease-out`}
        />
      </div>

      {/* MESSAGE BELOW BAR */}
      <p className={`mt-1 text-[11px] font-bold ${level.text}`}>
        {level.message}
      </p>
    </div>
  )
}

export function TooltipIcon({ id, content }: TooltipIconProps) {
  return (
    <>
      <span
        data-tooltip-id={id}
        data-tooltip-content={content}
        className="text-[#00AFEF] text-[11px]  cursor-pointer"
      >
        ⓘ
      </span>

      <Tooltip
        id={id}
        place="top"
        style={{
          fontSize: '11px',
          padding: '6px 10px',
          borderRadius: '6px',
          backgroundColor: '#0f172a',
        }}
      />
    </>
  )
}

/* ================= MAIN ================= */
export default function SupplierSignup() {

      const router = useRouter()
      const [showPassword, setShowPassword] = useState(false)
      const [hidePasswordEye, setHidePasswordEye] = useState(0)   
      const [uploadedFiles, setUploadedFiles] = useState<{[key: number]: File | null}>({});
      const [docGroups, setDocGroups] = useState<any[]>([]);
      const [selectedDocs, setSelectedDocs] = useState<{ [key: number]: any }>({});
      const [usernameSuccess, setUsernameSuccess] = useState("");
      const [usernameError, setUsernameError] = useState<string>("");
      const [isUsernameChecked, setIsUsernameChecked] = useState(false);
      const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);     
      const [phoneError, setPhoneError] = useState("");
      const [phoneSuccess, setPhoneSuccess] = useState("");
      const [isPhoneChecked, setIsPhoneChecked] = useState(false);
      const [isPhoneAvailable, setIsPhoneAvailable] = useState(false);      
        const [multiDocs, setMultiDocs] = useState<{
    [groupId: number]: any[]
  }>({});

  const [tempDocs, setTempDocs] = useState<{
    [groupId: number]: any
  }>({});

  const [multiFiles, setMultiFiles] = useState<{
    [groupId: number]: File | null
  }>({});
   type Country = {
  name: string;
};
const [countries, setCountries] = useState<Country[]>([]);
const [phoneCodes, setPhoneCodes] = useState<any[]>([])

type DocType = {
  document_type: string;
  description: string;
  category: string;
};

const [docTypes, setDocTypes] = useState<DocType[]>([]);

      useEffect(() => {
        setShowPassword(false)
      }, [hidePasswordEye])

      const [step, setStep] = useState<1 | 2 | 3>(1)
      const [error, setError] = useState('')
      const [passwordError, setPasswordError] = useState('')
     
      const [show, setShow] = useState(false)
      const [submitted, setSubmitted] = useState({
        step1: false,
        step2: false,
        step3: false,
        })
      const [passwordStrengthInfo, setPasswordStrengthInfo] = useState<{
              id: number
              value: string
            } | null>(null)
   
      const [emailError, setEmailError] = useState('')
      const [confirmPasswordError, setConfirmPasswordError] = useState('')
      const [taxIdError, setTaxIdError] = useState('')
      const [websiteError, setWebsiteError] = useState('')
      const [tradeLicenseNumberError, setTradeLicenseNumberError] = useState('')
      const [registrationCertNumberError, setRegistrationCertNumberError] =  useState('')   
      
      type PhoneCountry  = {
  code: string
  name: string
  dialCode: string
  flag: string
}

// Your existing flag function (KEEP THIS)
const getFlagEmoji = (code: string) =>
  code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  );


//  State (make sure these exist)

const [countryCodes, setCountryCodes] = useState<any[]>([]);

const [selectedCountry, setSelectedCountry] =
  useState<any | undefined>(undefined);


//  Fetch country codes

useEffect(() => {

  const fetchCountryCodes = async () => {

    try {

      const response =
        await phoneNoService.getPhoneCodes();

      console.log("Country Codes:", response);

      const codes = response || [];

      // Format API response
      const formatted = codes.map((c: any) => ({
        code: c.iso2,
        name: c.iso2,
        dialCode: c.phone_code,
        flag: getFlagEmoji(c.iso2),
      }));

      if (formatted.length > 0) {

        setCountryCodes(formatted);

        // Check localStorage first
        const savedCountry =
          localStorage.getItem("userCountryCode");

        let selected;

        if (savedCountry) {

          selected = formatted.find(
            (c: any) =>
              `${c.code}-${c.dialCode}` === savedCountry
          );

        }

        //  If no saved country → select India
        if (!selected) {

          selected =
            formatted.find(
              (c: any) => c.code === "IN"
            ) || formatted[0];

        }

        //  Set selected country
        setSelectedCountry(selected);

        // Update form
        setForm((prev: any) => ({
          ...prev,
          countryCode:
            `${selected.code}-${selected.dialCode}`,
        }));

      }

    } catch (error) {

      console.error(
        "Country code fetch failed:",
        error
      );

    }

  };

  fetchCountryCodes();

}, []);


// Auto-fill Phone + Email from localStorage
useEffect(() => {

  const savedPhone =
    localStorage.getItem("userPhoneNumber");

  const savedEmail =
    localStorage.getItem("userEmail");

  if (savedPhone || savedEmail) {

    setForm((prev: any) => ({
      ...prev,
      phone: savedPhone || prev.phone,
      email: savedEmail || prev.email,
    }));

  }

}, []);

      useEffect(() => {
  const fetchCountries = async () => {
    try {
      const res = await countryListService.getCountries();
          console.log("API Response:", res);
      console.log("API Data:", res?.data);
       setCountries(res || []);

    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  fetchCountries();
}, []);

const checkPhoneNumber = async () => {

  const mobile = form.phone?.trim();

  if (!mobile) {

    setPhoneError("Required");
    setPhoneSuccess("");
    return;

  }

  try {

    const response =
      await phoneNumberAvailService.checkAvailability(mobile);

    console.log("Phone API Response:", response);

    if (response?.available) {

      setPhoneError("");
      setPhoneSuccess("Phone number is available");
       setIsPhoneChecked(true);
      setIsPhoneAvailable(true);

    } else {
      const msg =
        "This phone number is already registered.";

       setPhoneError(msg);
      setPhoneSuccess("");
      setIsPhoneChecked(true);
      setIsPhoneAvailable(false);

    }

  } catch (error) {

    console.error("Phone check failed:", error);

    setPhoneError("Unable to check phone number");
    setPhoneSuccess("");
    setIsPhoneChecked(false);
    setIsPhoneAvailable(false);

  }

};






const checkUsername = async () => {

  const username = form.username?.trim();

  if (!username) {
    setUsernameError("Required");
    setUsernameSuccess("");
    return;
  }

  try {

    const response =
      await userNameService.checkAvailability(username);

    console.log("Username API Response:", response);

if (response?.available) {

  setUsernameError("");
  setUsernameSuccess("Username is available");

  setIsUsernameChecked(true);
  setIsUsernameAvailable(true);

} else {

  setUsernameError(
    "This username is already taken. Please choose a different username."
  );

  setUsernameSuccess("");

  setIsUsernameChecked(true);
  setIsUsernameAvailable(false);
}

  } catch (error) {

    console.error("Username check failed:", error);

    setUsernameError("Unable to check username");
    setUsernameSuccess("");

  }
};

const fetchSupplierDocGroups = async () => {

  try {

    console.log(
      "Calling Supplier Document API..."
    );

    const res =
      await docTypelookupService.getDocTypes(
        "SUPPLIER"
      );

    console.log(
      "Raw Response:",
      res
    );

    // Parse json_agg
    const groups = JSON.parse(
      res[0].json_agg
    );

    console.log(
      "Parsed Groups:",
      groups
    );

    setDocGroups(groups);

  } catch (error) {

    console.error(
      "Error fetching supplier docs:",
      error
    );

  }

};

      const [form, setForm] = useState<FormData>({
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          countryCode: "IN-+91",
          phone: '',
          username: '',
          password: '',
          confirmPassword: '',
          supplierLegalName: '',
          tradeName: '',
          serviceTypes: [],
          countryOfRegistration: '',
          panTaxId: '',
          websiteUrl: '',
          tradeLicense: null,
           tradeLicenseNumber: '',
           registrationCert: null,
           compRegistrationNumber: '',  
          taxDocType: '',
          taxRegistrationDoc: null,
          otherDocs: [],
          })


          useEffect(() => {
  // Get values from localStorage
  const savedEmail = localStorage.getItem("userEmail");
  const savedPhone = localStorage.getItem("userPhoneNumber");
  const savedCountryCode = localStorage.getItem("userCountryCode");

  setForm((prev) => ({
    ...prev,
    email: savedEmail || prev.email,
    phone: savedPhone || prev.phone,
    countryCode: savedCountryCode || prev.countryCode
  }));

}, []);
  /* CLOSE SERVICE DROPDOWN */ 

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
      const { name, value } = e.target
      setForm(prev => ({ ...prev, [name]: value }))
     if (submitted.step1 || submitted.step2 || submitted.step3) {
        setError('')
        }
    // USERNAME VALIDATION
if (name === "username") {

  setUsernameSuccess("");

  setIsUsernameChecked(false);
  setIsUsernameAvailable(false);

  const error = validateUsername(value);
  setUsernameError(error);
}

     if (name === "email") {
  setEmailError(validateEmail(value))
}

      if (name === "phone") {
        setPhoneSuccess("");
  setPhoneError(validatePhone(value, form.countryCode))
}

if (name === "countryCode") {
  setPhoneError(validatePhone(form.phone, value))
}

   if (name === "website") {
  const error = validateWebsiteLive(value)
  setWebsiteError(error)
}

if (name === "password") {
  setConfirmPasswordError("")
  setPasswordStrengthInfo(null)
  setPasswordError("")

  const result = validatePassword(
    value,
    form.firstName,
    form.middleName,
    form.lastName
  )

  setPasswordError(result.error)

  if (result.strength) {
    setPasswordStrengthInfo(result.strength)
  }

  const confirmError = validateConfirmPassword(
    value,
    form.confirmPassword
  )

  setConfirmPasswordError(confirmError)
}

if (name === "confirmPassword") {
  setHidePasswordEye(v => v + 1)

  const confirmError = validateConfirmPassword(
    form.password,
    value
  )

  setConfirmPasswordError(confirmError)
}
  }


  const handleRegister = async () => {
    const serviceTypeObject: Record<string, {}> = {};

(form.serviceTypes || []).forEach((type) => {
  if (type?.trim()) {
    serviceTypeObject[type.trim()] = {};
  }
});
  // Step 1: optional client-side validation before API call
  if (!form.username || !form.password || !form.email || !form.phone) {
    setError("Please fill all required fields.");
    return;
  }

  try {
    //  Call the API
    const response = await userCreationService.createUser({
      username: form.username,
      password: form.password,
      email: form.email,
      phone: form.phone,
      user_org_id: 4, // replace with actual org id
    });

    console.log("User creation response:", response);

    //  Extract user_id from response
    const userId = response?.user_id || response?.id;
    if (userId) {
      console.log("Created User ID:", userId);
      alert(`User ID: ${userId}`);
      // You can store it in state or localStorage
      localStorage.setItem("userId", userId);
  
    // 3. Call supplier profile API using received user_id
    const supplierResponse =
      await supplierProfileCreationService.createSupplierProfile({
  user_id: userId,
  firstname: form.firstName?.trim() || "",
  middlename: form.middleName?.trim() || "",
  lastname: form.lastName?.trim() || "",
  email: form.email || "",
  countrycode: "+91" ,//form.countryCode?.trim() || "",
  phonenumber: form.phone?.trim() || "",
  suppliername: form.supplierLegalName?.trim() || "",
  tradename: form.tradeName?.trim() || "",
  servicetype: serviceTypeObject,
  country: form.countryOfRegistration?.trim() || "",
  websiteurl: form.websiteUrl?.trim() || "",
});

    console.log("Supplier profile response:", supplierResponse);

    // 4. Navigate only after both APIs succeed
    router.push("/next-step"); // replace with actual route
  } 
}catch (err: any) {
    console.error("Error in registration flow:", err);
    setError(err?.message || "Failed to register. Please try again.");
  }
};

   const getBorderClass = (
  stepSubmitted: boolean,
  isMandatory: boolean,
  value?: string | string[] | boolean | null,
  hasError: boolean = false
) => {
  const isEmpty =
    typeof value === "string"
      ? !value.trim()
      : Array.isArray(value)
      ? value.length === 0
      : !value

  if (stepSubmitted && isMandatory && (isEmpty || hasError)) {
    return "border-red-500"
  }

  if (hasError) {
    return "border-red-500"
  }

  return "border-slate-300"
}

  const handleAddMultiDocument = (group: any) => {

  const groupId = group.groupid;

  const selected =
    tempDocs[groupId];

  const file =
    multiFiles[groupId];

  if (!selected) {
    alert("Please select document type");
    return;
  }

  if (!selected.identifierValue) {
    alert("Please enter document identifier");
    return;
  }

  if (!file) {
    alert("Please upload file");
    return;
  }

  const existing =
    multiDocs[groupId] || [];

  if (existing.length >= group.max) {
    alert(
      `Maximum ${group.max} documents allowed`
    );
    return;
  }

  // Prevent duplicate document type
  const duplicate =
    existing.find(
      (doc: any) =>
        doc.document_type ===
        selected.document_type
    );

  if (duplicate) {
    alert(
      "This document type already added"
    );
    return;
  }

  const newDoc = {

    document_type:
      selected.document_type,

    description:
      selected.description,

    identifierValue:
      selected.identifierValue,

    file

  };

  setMultiDocs(prev => ({
    ...prev,
    [groupId]: [
      ...existing,
      newDoc
    ]
  }));

  // Reset temp
  setTempDocs(prev => ({
    ...prev,
    [groupId]: null
  }));

  setMultiFiles(prev => ({
    ...prev,
    [groupId]: null
  }));

};

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-4 pt-24 md:pt-20">

     <div className="fixed top-0 left-0 w-full h-[70px] bg-white z-50 px-6 pt-4 border-b border-[#e5e7eb]">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="Bonhomiee"
          className="h-[32px] w-auto"
        />
        <h1 className="text-lg font-bold text-[#00AFEF]">
          Bonhomiee
        </h1>
      </div>
    </div>       

        <div className="bg-white rounded-[4px] border border-[#f1f1f1] grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full min-h-[85vh] md:h-[85vh]">
      
          {/* LEFT IMAGE SECTION */}
          <div className="hidden md:block relative">
            <Image src={supplierPic} alt="Signup" fill className="object-cover" />
            <div className="absolute inset-0 bg-blue-900/10"></div>          
          </div>

             {/* RIGHT FORM SECTION */}
             <div className="h-full">
                  <form className="p-4 md:p-6 flex flex-col min-h-[85vh] md:h-[85vh]">
                    {/* HEADER – FIXED */}
                      <div className="shrink-0">
                            <h2 className="text-base font-semibold text-center mb-1 text-[#00AFEF]">
                              Supplier Signup
                            </h2>

                          <StepIndicator step={step} />
                          <FormErrorBanner message={error} />
                    </div>
                    
                    {/* divider */}
                     <div className="mx-12 mb-5 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>   

            {/* body*/}
       <div  className="flex-1  overflow-y-auto touch-pan-y  px-1 pb-2         
        scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-transparent
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#00AFEF]
              [&::-webkit-scrollbar-thumb]:rounded-full">
         
              <div className="space-y-3">            
                {step === 1 && (
                  <>
                    <Label htmlFor="firstName" className="text-slate-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                    <ShadInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={handleChange}
                    autoFocus
                    className={`h-12 bg-white  border border-slate-300 text-slate-900
                    placeholder:text-slate-400
                    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
                    ${getBorderClass(submitted.step1, true, form.firstName)}`}
                    />
                    <ErrorMessage
                      message={
                        submitted.step1 && !form.firstName.trim()
                          ? 'Required'
                          : undefined
                      }
                    />
                    <Label htmlFor="middleName" className="text-slate-700">
                    Middle Name (optional)
                  </Label>
                    <ShadInput  placeholder="Enter middle name" id= "middleName" type="text" name="middleName"   value={form.middleName} onChange={handleChange} 
                    className="h-12 bg-white border-slate-300 text-slate-900
                    placeholder:text-slate-400
                    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
                     />
                    
                  <Label htmlFor="lastName" className="text-slate-700">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                    <ShadInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className={` h-12 bg-white  border border-slate-300 text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
                  ${getBorderClass(submitted.step1, true, form.lastName)}`}/>   
                 
                   <ErrorMessage
                      message={
                        submitted.step1 && !form.lastName.trim()
                          ? 'Required'
                          : undefined
                      }
                    />

                    <Label htmlFor="email" className="text-slate-700">
                    Email <span className="text-red-500">*</span>

                    <TooltipIcon
                          id="tooltip-email"
                          content="Enter a valid email address like name@example.com" /></Label>
                
                    <ShadInput
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled
                    placeholder="Enter email"
                    value={form.email}
                    readOnly
                    onChange={handleChange}
                    className={`h-12 bg-white  border border-slate-300 text-slate-900
                    placeholder:text-slate-400
                   focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
                    ${getBorderClass(submitted.step1, true, form.email,!!emailError)}`}/>   
                  
                     <ErrorMessage
                        message={
                          emailError ||
                          (submitted.step1 && !form.email.trim()
                            ? 'Required'
                            : undefined)
                        }
                      />

                      {/* PHONE */}
                      <div >

                        <Label htmlFor="phone" className="text-slate-700">
  Phone Number <span className="text-red-500">*</span>
  <TooltipIcon
    id="tooltip-phone"
    content="Please enter valid phone number"
  />
</Label>

<div className="flex gap-2 mt-2 items-center">

<CountryCodeCombobox
  countries={countryCodes}
  value={selectedCountry || undefined}
  onChange={() => {}}   // no change allowed
  open={false}          // prevents opening
  onOpenChange={() => {}} // prevents toggle
  className="w-30 h-12 pointer-events-none opacity-70 cursor-not-allowed"
                                    
/>

  <ShadInput
    name="phone"
    id="phone"
    type="tel"
    value={form.phone}
    disabled
    readOnly
    onChange={handleChange}
    placeholder="Enter phone number"
    maxLength={10}
    className={`flex-grow !h-12 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${
      submitted.step1 && (phoneError || !form.phone)
        ? "border-red-500 ring-1 ring-red-500"
        : "border-slate-300"
    }`}
    inputMode="numeric"
  />
  <PremiumButton
    type="button"
    variant="primary"
  disabled={!form.phone}
    onClick={checkPhoneNumber}
    className="h-12"
  >
    Check
  </PremiumButton>
</div>

<ErrorMessage
  message={
    phoneError ||
    (submitted.step1 && !form.phone.trim() ? "Required" : undefined)
  }
/>
{phoneSuccess && (


<div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <AlertCircle size={12} className="text-green-600" />
                        <span className="text-green-700 text-xs font-bold tracking-tight">{phoneSuccess}</span>
                      </div> 
)}
                      </div>
<Label htmlFor="username" className="text-slate-700">
  Username <span className="text-red-500">*</span>
  <TooltipIcon
    id="tooltip-username"
    content="Must start with a letter, followed by underscores or numbers. 6–16 characters allowed."
  />
</Label>

{/* Input + Check Button Row */}
<div className="flex items-center gap-2">

  <ShadInput
    id="username"
    name="username"
    type="text"
    required
    placeholder="Enter username"
    value={form.username}
    onChange={handleChange}
    className={`h-12 bg-white border border-slate-300 text-slate-900
    placeholder:text-slate-400
    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
    ${getBorderClass(submitted.step1,true,form.username, !!usernameError)}`}
  />

  {/* Check Button */}

   <PremiumButton 
      type="button" 
      variant="primary"
      onClick={checkUsername} 
       disabled={!form.username?.trim()}  
      className="h-12"
     // icon={isUserChecking ? <Loader2 size={12} className="animate-spin" /> : null}
      >
      Check
    </PremiumButton>


</div>

<ErrorMessage
  message={
    usernameError ||
    (submitted.step1 && !form.username.trim()
      ? 'Required'
      : undefined)
  }
/>
{usernameSuccess && (
  
 <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100 animate-in fade-in slide-in-from-top-1 duration-300">
                        <AlertCircle size={12} className="text-green-600" />
                        <span className="text-green-700 text-xs font-bold tracking-tight">{usernameSuccess}</span>
                      </div> 
)}                                               

    <Label htmlFor="password" className="text-slate-700">
  Password <span className="text-red-500">*</span>
  <TooltipIcon
    id="tooltip-password"
    content="Password must be at least 8 characters with uppercase, lowercase, number & symbol"
  />
</Label>

<div className="relative">
  <ShadInput
    id="password"
    name="password"
    type={showPassword ? "text" : "password"}   
    required
    placeholder="Enter strong password"
    autoComplete="new-password"
    value={form.password}
    onChange={(e) => {
      if (showPassword) setShowPassword(false) 
      handleChange(e)
    }}
    onCopy={blockClipboard}
    onCut={blockClipboard}
    onPaste={blockClipboard}
    onContextMenu={blockContextMenu}
    className={`pr-9 h-12 bg-white border border-slate-300 text-slate-900
    placeholder:text-slate-400
    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
    ${getBorderClass(submitted.step1, true, form.password, !!passwordError)}`}
  />

  {/* 👁 Eye Button */}
  <button
    type="button"
    onClick={() => setShowPassword(prev => !prev)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF]"
  >
    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>
  <ErrorMessage
  message={
    passwordError ||
    (submitted.step1 && !form.password
      ? 'Required'
      : undefined)
  }
/>    

{form.password && !passwordError && (
<PasswordStrengthMeter strength={passwordStrengthInfo} />
)}
               

<Label htmlFor="confirmPassword" className="text-slate-700">
  Re-Type Password <span className="text-red-500">*</span>
  <TooltipIcon
    id="tooltip-confirm-password"
    content="Must match the password entered above."
  />
</Label>

<ShadInput
  id="confirmPassword"
  name="confirmPassword"
  type="password"
  required
  placeholder="Re-enter password"
  autoComplete="new-password"
  value={form.confirmPassword}
  onChange={handleChange}
  onCopy={blockClipboard}
  onCut={blockClipboard}
  onPaste={blockClipboard}
  onContextMenu={blockContextMenu}
  onFocusCapture={() => setHidePasswordEye(v => v + 1)}
  onInput={() => setHidePasswordEye(v => v + 1)}
  className={`h-12 bg-white border border-slate-300 text-slate-900
  placeholder:text-slate-400
  focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
  ${getBorderClass(submitted.step1, true, form.confirmPassword, !!confirmPasswordError)}`}
/>

<ErrorMessage
  message={
    confirmPasswordError ||
    (submitted.step1 && !form.confirmPassword
      ? "Required"
      : undefined)
  }
/>               
                  </>
                      )}

                {step === 2 && (
                  <>
 <Label htmlFor="supplierLegalName" className="text-slate-700">
  Supplier Legal Name <span className="text-red-500">*</span>
</Label>

<ShadInput
  id="supplierLegalName"
  name="supplierLegalName"
  type="text"
  required
  placeholder="Registered legal name"
  value={form.supplierLegalName}
  onChange={handleChange}
  className={`h-12 bg-white border border-slate-300 text-slate-900
  placeholder:text-slate-400
  focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
  ${getBorderClass(submitted.step2, true, form.supplierLegalName)}`}
/>

<ErrorMessage
  message={
    submitted.step2 && !form.supplierLegalName.trim()
      ? "Required"
      : undefined
  }
/>
<Label htmlFor="tradeName" className="text-slate-700">
  Trade Name <span className="text-red-500">*</span>
</Label>

<ShadInput
  id="tradeName"
  name="tradeName"
  type="text"
  required
  placeholder="Business / brand name"
  value={form.tradeName}
  onChange={handleChange}
  className={`h-12 bg-white border border-slate-300 text-slate-900
  placeholder:text-slate-400
  focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
  ${getBorderClass(submitted.step2, true, form.tradeName)}`}
/>

<ErrorMessage
  message={
    submitted.step2 && !form.tradeName.trim()
      ? "Required"
      : undefined
  }
/>

   {/* SERVICE TYPE */}

   
<ServiceTypeSelect  
  value={form.serviceTypes || []}   

    error={
    submitted.step2 &&
    (!form.serviceTypes || form.serviceTypes.length === 0)
  }
  onChange={(values) =>
    setForm((prev) => ({
      ...prev,
      serviceTypes: values || [],   
    }))
  } 
  
/>
<ErrorMessage
  message={
    submitted.step2 && (!form.serviceTypes || form.serviceTypes.length === 0)
      ? "Required"
      : undefined
  }
/>    
 <div className="flex flex-col gap-1">
                   <Label className="text-slate-700">
  Country of Registration <span className="text-red-500">*</span>
</Label>

<Select
  value={form.countryOfRegistration || ""}
  onValueChange={(value) =>
    setForm((prev) => ({
      ...prev,
      countryOfRegistration: value,
    }))
  }
>
  <SelectTrigger
    className={`w-full !h-12 bg-white border border-slate-300 
    text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] 
    focus:ring-1 focus:ring-[#3FB8FF] ${getBorderClass(
      submitted.step2,
      true,
      form.countryOfRegistration,
      false
    )}`}
  >
    <SelectValue placeholder="Select country" />
  </SelectTrigger>

<SelectContent
  //position="popper"
  side="bottom"
  align="start"
// sideOffset={0}
// avoidCollisions={false}
    className="bg-white border-slate-200 z-[9999]"
>
  
  {countries.length === 0 ? (
    <SelectItem value="loading" disabled>
      Loading countries...
    </SelectItem>
  ) : (
    countries.map((country) => (
      <SelectItem
        key={country.name}
        value={country.name}
      >
        {country.name}
      </SelectItem>
    ))
  )}
</SelectContent>
</Select>
                </div>
                     <ErrorMessage
                    message={
                      submitted.step2 && !form.countryOfRegistration
                        ? 'Required'
                        : undefined
                    }
                  />   

  <Label htmlFor="websiteUrl" className="text-slate-700">
  Website URL <span className="text-red-500">*</span>
  <TooltipIcon
    id="tooltip-websiteUrl"
    content="Example: www.company.com"
  />
</Label>

<ShadInput
  id="websiteUrl"
  name="websiteUrl"
  type="text"
  required
  placeholder="Company website"
  value={form.websiteUrl}
  onChange={handleChange}
  className={`h-12 bg-white border border-slate-300 text-slate-900
  placeholder:text-slate-400
  focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
  ${getBorderClass(
    submitted.step2,
    true,
    form.websiteUrl,
    !!websiteError
  )}`}
/>

<ErrorMessage
  message={
    websiteError ||
    (submitted.step2 && !form.websiteUrl.trim()
      ? "Required"
      : undefined)
  }/>        
              </>
           )}
        {step === 3 && (
    <SupplierDocuments

    docGroups={docGroups}

    uploadedFiles={uploadedFiles}
    setUploadedFiles={setUploadedFiles}

    selectedDocs={selectedDocs}
    setSelectedDocs={setSelectedDocs}

    tempDocs={tempDocs}
    setTempDocs={setTempDocs}

    multiFiles={multiFiles}
    setMultiFiles={setMultiFiles}

    multiDocs={multiDocs}
    setMultiDocs={setMultiDocs}

    handleAddMultiDocument={handleAddMultiDocument}
     submitted={submitted}    
  />
)}                
            </div>
          </div>
        
            {/* FOOTER – FIXED */}
        <div className="shrink-0 pt-4  border-gray-200">
              {step === 1 && (
              <div className="flex flex-col md:flex-row gap-3 pt-4">                  
                    <PremiumButton 
                                      type="button" 
                                      variant="destructive"
                                      size="lg"
                                      onClick={() => router.push("/")}
                                      className="w-full">
                                      Cancel
                                    </PremiumButton>
                    <PremiumButton
                      type="button"
                        variant="primary"
                        size="lg"
                          className="w-full"
                           onClick={() => {
                        setSubmitted(prev => ({ ...prev, step1: true }))

                //Mandatory fields validation

                    const result = validateStep1(form, {
                              emailError,
                              phoneError,
                              usernameError,
                              passwordError,
                              confirmPasswordError
                            })
                        if (result === 'EMPTY') {
                          setError('Kindly fill-up all the mandatory fields.')
                          return
                        }

                        if (result === 'INVALID') {
                          setError('Please fill the mandatory fields correctly')
                          return
                        }

                        /* ===============================
   PHONE VALIDATION
=============================== */

if (!isPhoneChecked) {

  const msg =
    "Please click Check to verify phone number availability";

  setPhoneError(msg);
  setError("Please verify your phone number availability to continue registration.");

  return;
}

if (!isPhoneAvailable) {

  const msg =
    "This phone number is already registered.";

  setPhoneError(msg);
  setError("This phone number is already registered. Please use a different phone number.");
  return;
}

//Mandatory validation
  if (!form.username) {
    setError(
      "Kindly fill-up all the mandatory fields."
    );

    return;
  }  
  
  //if the check button is clicked
  if (!isUsernameChecked) {

    setUsernameError(
      "Please click Check to verify username availability"
    );

    setError(
      "Please Check username availability"
    );

    return;
  }
            //  Username availability check
                      if (!isUsernameAvailable) {

    setUsernameError(
     
 "This username is not available."
    );
    setError(
      "This username is already taken. Please choose a different username."
    );

                      return;
                    }                
                        setError('')
                        setStep(2)
                      }}                    
                    >
                      Next
                  </PremiumButton>                                  
                  </div>
                  )}
              {step === 2 && (
              <div className="flex justify-between gap-4 pt-4">

                   <PremiumButton
                      type="button"
                        variant="primary"
                        size="lg"
                          className="w-full"
                    onClick={() => {
                     
                      setPasswordError('')
                       setUsernameError('') 
                      setError('')
                      setStep(1)
                    }}
                     >
                    Back
                  </PremiumButton>
                  
                 <PremiumButton
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={async () => {

                      setSubmitted(prev => ({ 
                        ...prev, 
                        step2: true 
                      }))

                      const result = validateStep2(
                        form,
                        websiteError
                      )

                      if (result === 'EMPTY') {
                        setError(
                          'Kindly fill-up all the mandatory fields.'
                        )
                        return
                      }

                      if (result === 'INVALID') {
                        setError(
                          'Please fill the mandatory fields correctly'
                        )
                        return
                      }                      

                      //  CALL SERVICE HERE
                      try {
                      await fetchSupplierDocGroups()
                       setError('')   
                        setStep(3)
                      } 
                      catch (err) {
                      setError
                      (
                        "Unable to load document requirements. Please try again."
                      )
                      return
                    }
                   
                    }}
                  >
                    Next
                  </PremiumButton>
                </div>
              )}
          {step === 3 && (
           <div className="flex justify-between gap-4 pt-4">

          <PremiumButton
                      type="button"
                        variant="primary"
                        size="lg"
                        className='w-full'
            onClick={() => setStep(2)}   >
            Back
          </PremiumButton>

          <PremiumButton
                      type="button"
                        variant="primary"
                        size="lg"
                        className='w-full'          
            onClick={async () => {
  setSubmitted(prev => ({ ...prev, step3: true }))

  // const result = validateStep3(form, taxIdError)

  // if (result === 'EMPTY') {
  //   setError('Kindly fill-up all the mandatory fields.')
  //   return
  // }

  // if (result === 'INVALID') {
  //   setError('Please fill the mandatory fields correctly')
  //   return
  // }

  setError('')

  await handleRegister()   //  CLEAN CALL HERE
}}
           
          >
            Register
          </PremiumButton>
        </div>
       )}
      </div>
     
      </form>
      </div>
      </div>

   
    </main>
  )
}

/* ================= INPUT ================= */
  function Input({
  label,
  required = false,
  tooltip,
  showEye = false,
  forceHideEye = 0,
  type = "text",
  name,
  ...props
}: {
  label: string
  required?: boolean
  tooltip?: string
  showEye?: boolean
  forceHideEye?: number
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false)
  React.useEffect(() => {
    setShow(false)
  }, [forceHideEye])
  const tooltipId = `tooltip-${name}`
  return (
    <div className="flex flex-col gap-1">

      <label className={`${labelClass} flex items-center gap-1`}>
        {label} {required && <span className="text-red-500">*</span>}

        {tooltip && (
          <TooltipIcon
            id={tooltipId}
            content={tooltip}
          />
        )}
      </label>
      <div className="relative">
       <ShadInput
  {...props}
  name={name}
  type={showEye && show ? "text" : type}
  className={`h-12 bg-white border border-slate-300 text-slate-900
  placeholder:text-slate-400
  focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
  pr-9 ${props.className ?? ""}`}
        />
        {showEye && (
          <button
            type="button"
            onClick={() => setShow(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF] transition"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}

      </div>
    </div>
  )
}


