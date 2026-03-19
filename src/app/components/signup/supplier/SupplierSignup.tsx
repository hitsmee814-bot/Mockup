'use client'

    /* ================= IMPORTS ================= */

import { parsePhoneNumberFromString } from 'libphonenumber-js' //123
import React,{ useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { passwordStrength } from 'check-password-strength'
import Image from "next/image";
import logo from "../../../assets/images/logoPrimary.png"
import supplierPic from "../../../assets/images/traveling-concept-with-landmarks.jpg"
import { Input as ShadInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PremiumButton } from "../../../utils/PremiumButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { validateEmail } from "./supplierSignupValidation"
import { validatePhone } from "./supplierSignupValidation"
import { validateUsername } from "./supplierSignupValidation"
import ServiceTypeSelect from "./ServiceTypeSelect"
import { FileInput, MultiFileInput } from "./FileHandlers"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

import {
  Upload as UploadIcon,
  Paperclip,
  X,
} from 'lucide-react'



/* ================= TYPES ================= */
type NamedDocument = {
  file: File
  name: string
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
  
  

   const WEBSITE_REGEX =
/^(https?:\/\/)?(?:(?:www\.)|(?!w+\.))([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/

  const STRONG_PASSWORD =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

  const blockClipboard = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault()
    }

    const blockContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
     e.preventDefault()
    }
    const TAX_FORMATS: Record<string,
    { label: string; placeholder: string; regex: RegExp; error: string }> = {
      GST: {
      label: 'GST Number',
      placeholder: 'Enter GST Number',
      regex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      error: 'Please enter valid GST number',
    },
     PAN: {
      label: 'PAN Number',
      placeholder: 'Enter PAN Number',
      regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      error: 'Please enter valid PAN number',
    },
      VAT: {
      label: 'VAT Number',
      placeholder: 'Enter VAT Number',
      regex: /^[A-Z0-9]{8,12}$/,
      error: 'Please enter valid VAT number',
    },
  }

const labelClass = "text-[12px] font-medium text-[#1A1A1A]"; 
const errorTextClass = "text-[11px] font-semibold text-red-600";
const inputTextClass = "text-[12px] text-black";
const placeholderClass = "placeholder:text-[12px] placeholder:text-gray-400";

const inputClass = `h-[38px] w-full rounded border border-[#00AFEF] bg-white px-3 
   ${inputTextClass} ${placeholderClass} focus:outline-none`;

const COUNTRY_CODES = [
  { code: '+1', label: 'US' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'IN' },
  
]

const REG_COUNTRIES = [
  'United States',
  'United Kingdom',
  'India',
  'Canada',
  'Australia',
  'Germany',
]
const dropdownInputClass =
  `${inputClass} flex items-center justify-between cursor-pointer`

const SERVICE_OPTIONS = [
  'Hotel',
  'Flight',
  'Transport',
  'Tour',
  'Visa',
  'Cruise',
]

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

const containsPersonalName = (
  password: string,
  firstName: string,
  middleName: string,
  lastName: string
) => {
  const pwd = password.toLowerCase()

  return [firstName, middleName, lastName]
    .filter(Boolean)
    .some(name => pwd.includes(name.toLowerCase()))
}
/* ================= MAIN ================= */
export default function SupplierSignup() {

      const router = useRouter()
      const serviceAnchorRef = useComboboxAnchor()
      const dropdownRef = useRef<HTMLDivElement>(null)
      const serviceTriggerRef = useRef<HTMLDivElement>(null)
      const serviceDropdownRef = useRef<HTMLDivElement>(null)
      const [showPassword, setShowPassword] = useState(false)
      const [hidePasswordEye, setHidePasswordEye] = useState(0)   
      const [open, setOpen] = useState(false)   

      useEffect(() => {
        setShowPassword(false)
      }, [hidePasswordEye])

      const [step, setStep] = useState<1 | 2 | 3>(1)
      const [error, setError] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const [usernameError, setUsernameError] = useState('')
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
      const [phoneError, setPhoneError] = useState('')
      const [taxIdError, setTaxIdError] = useState('')
      const [websiteError, setWebsiteError] = useState('')
      const [tradeLicenseNumberError, setTradeLicenseNumberError] = useState('')
      const [registrationCertNumberError, setRegistrationCertNumberError] =  useState('')        
  
      const [form, setForm] = useState<FormData>({
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          countryCode: '+91',
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
  const error = validateUsername(value)
  setUsernameError(error)
}
     if (name === "email") {
  setEmailError(validateEmail(value))
}

      if (name === "phone") {
  setPhoneError(validatePhone(value, form.countryCode))
}

if (name === "countryCode") {
  setPhoneError(validatePhone(form.phone, value))
}

      if (name === 'websiteUrl') {
        validateWebsiteLive(value)
      }


if (name === 'password') {
  setConfirmPasswordError('')
  setPasswordStrengthInfo(null)
  setPasswordError('')

  if (!value) {
    validateConfirmPasswordLive('', form.confirmPassword)
    return
  }

  //  Strong password rule
  if (!STRONG_PASSWORD.test(value)) {
    setPasswordError(
      'The password does not yet meet the required criteria.'
    )
    validateConfirmPasswordLive(value, form.confirmPassword)
    return
  }

  //  NEW: Personal name check
  if (
    containsPersonalName(
      value,
      form.firstName,
      form.middleName,
      form.lastName
    )
  ) {
    setPasswordError(
      'Password should not contain your first, middle, or last name.'
    )
    validateConfirmPasswordLive(value, form.confirmPassword)
    return
  }

  // Strength check (only if valid)
  const result = passwordStrength(value)
  setPasswordStrengthInfo(result)

  validateConfirmPasswordLive(value, form.confirmPassword)
}

if (name === 'confirmPassword') {
  setHidePasswordEye(v => v + 1) // FORCE hide every time
  validateConfirmPasswordLive(form.password, value)
}
  }

    const getStrengthColor = (id: number) => {
      switch (id) {
        case 0:
          return 'text-red-500'
        case 1:
          return 'text-orange-500'
        case 2:
          return 'text-yellow-500'
        case 3:
          return 'text-green-600'
        default:
          return 'text-gray-400'
      }
    }

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

const getTaxNumberBorderClass = () => {
  if (taxIdError) {
    return 'border-red-500'
  }
  return 'border-[#00AFEF]'
}

const getTaxPanelBorderClass = () => {
  if (
    submitted.step3 &&
    (
      !form.taxDocType ||
      !form.panTaxId.trim() ||
      !form.taxRegistrationDoc ||
      taxIdError
    )
  ) {
    return 'border-red-500'
  }
  return 'border-[#00AFEF]'
}

       const validateConfirmPasswordLive = (
          password: string,
          confirmPassword: string
        ) => {
          // If both empty → no error
          if (!password && !confirmPassword) {
            setConfirmPasswordError('')
            return
          }

          // If confirm empty → no error yet
          if (!confirmPassword) {
            setConfirmPasswordError('')
            return
          }

          // Mismatch
          if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match')
          } else {
            setConfirmPasswordError('')
          }
        }
     

const validateWebsiteLive = (value: string) => {
  // Empty → no error yet
  if (!value) {
    setWebsiteError('')
    return
  }

  if (!WEBSITE_REGEX.test(value)) {
    setWebsiteError('Please enter a valid website URL')
  } else {
    setWebsiteError('')
  }
}
const validateTaxIdLive = (value: string, docType: string) => {
  // If either is missing → no error yet
  if (!docType || !value) {
    setTaxIdError('')
    return
  }

  const rule = TAX_FORMATS[docType]
  if (!rule) return

  if (!rule.regex.test(value.toUpperCase())) {
    setTaxIdError(rule.error)
  } else {
    setTaxIdError('')
  }
}


 const toggleService = (option: string) => {
  setForm(prev => ({
    ...prev,
    serviceTypes: prev.serviceTypes.includes(option)
      ? prev.serviceTypes.filter(o => o !== option)
      : [...prev.serviceTypes, option],
  }))
}

const hasEmptyFields = (fields: (string | any[] | undefined | null)[]) => {
  return fields.some(field => {
    if (typeof field === "string") return !field.trim()
    if (Array.isArray(field)) return field.length === 0
    return true // handles undefined / null
  })
}

const validateStep1 = () => {
  // 1 Empty mandatory fields
 if (
  hasEmptyFields([
    form.firstName,
    form.lastName,
    form.email,
    form.phone,
    form.username,
    form.password,
    form.confirmPassword,
  ])
) {
  return "EMPTY"
}

  // 2 Invalid fields
  if (
    emailError ||
    phoneError ||
    usernameError ||
    passwordError ||
    confirmPasswordError
  ) {
    return 'INVALID'
  }

  // 3️ Password mismatch safety
  if (form.password !== form.confirmPassword) {
    setConfirmPasswordError('Passwords do not match')
    return 'INVALID'
  }

  return 'OK'
}


const validateStep2 = () => {
  if (
    hasEmptyFields([
      form.supplierLegalName,
      form.tradeName,
      form.serviceTypes,
      form.countryOfRegistration,
      form.websiteUrl,
    ])
  ) {
    return "EMPTY"
  }

  if (websiteError) return "INVALID"

  return "OK"
}
const validateStep3 = () => {
  // 1️ Trade License Number mandatory (set error explicitly)
  if (!form.tradeLicenseNumber.trim()) {
  
    return 'EMPTY'
  }

   if (!form.compRegistrationNumber.trim()) {
   
    return 'EMPTY'
  }
  // 2️ Missing other mandatory fields
  if (
    !form.tradeLicense ||
    !form.registrationCert ||
    !form.taxDocType ||
    !form.panTaxId.trim() ||
    !form.taxRegistrationDoc
  ) {
    return 'EMPTY'
    
  }

  // 3️ Invalid values
  if (taxIdError) {
    return 'INVALID'
  }

  return 'OK'
}

                const step3FileNames = [
                form.tradeLicense?.name,
                form.registrationCert?.name,
                form.taxRegistrationDoc?.name,
                ...form.otherDocs.map(doc => doc.file.name),
              ]
                .filter(Boolean)
                .map(name => name!.toLowerCase())



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
                    placeholder="Enter email"
                    value={form.email}
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

<div
  className={`flex gap-2 mt-2`}
>
  <Select
    value={form.countryCode}
    onValueChange={(value) =>
      handleChange({
        target: { name: "countryCode", value },
      } as React.ChangeEvent<HTMLInputElement>)
    }
  >
    <SelectTrigger
      className={`w-24 !h-12 bg-white text-slate-900 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] border-solid border-[1px] ${
        submitted.step1 && (phoneError || !form.phone)
          ? "border-red-500 ring-1 ring-red-500"
          : "border-slate-300"
      }`}
    >
      <SelectValue placeholder="Code" />
    </SelectTrigger>

    <SelectContent className="bg-white border-slate-200">
      {COUNTRY_CODES.map((c) => (
        <SelectItem key={c.code} value={c.code}>
          {c.label} {c.code}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  <ShadInput
    name="phone"
    id="phone"
    type="tel"
    value={form.phone}
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
</div>

<ErrorMessage
  message={
    phoneError ||
    (submitted.step1 && !form.phone.trim() ? "Required" : undefined)
  }
/>
                      </div>

                      <Label htmlFor="username" className="text-slate-700">
                    Username <span className="text-red-500">*</span>
                     <TooltipIcon
                          id="tooltip-username"
                          content="Must start with a letter, followed by underscores or numbers. 6–16 characters allowed." />
                  </Label>
                    <ShadInput
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter username"
                    value={form.username}
                    onChange={handleChange}                    
                    className={`h-12 bg-white  border border-slate-300 text-slate-900
                    placeholder:text-slate-400
                    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
                    ${getBorderClass(submitted.step1,true,form.username, !!usernameError)}`} />                     
                      
                        <ErrorMessage
                          message={
                            usernameError ||
                            (submitted.step1 && !form.username.trim()
                              ? 'Required'
                              : undefined)
                          }
                        />
                            

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
    type={showPassword ? "text" : "password"}   // ✅ only change here
    required
    placeholder="Enter strong password"
    autoComplete="new-password"
    value={form.password}
    onChange={(e) => {
      if (showPassword) setShowPassword(false) // ✅ same as your old logic
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
   className={`w-full !h-12 bg-white  border border-slate-300 
   text-slate-900   placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 
    focus:ring-[#3FB8FF] ${getBorderClass(
  submitted.step2,
  true,
  form.countryOfRegistration,
  false)
      }`}>
  <SelectValue placeholder="Select country" />
</SelectTrigger>

  <SelectContent  position="popper" className="bg-white border-slate-200 z-50">
    {REG_COUNTRIES.map((country) => (
      <SelectItem key={country} value={country}>
        {country}
      </SelectItem>
    ))}
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
            <>
                {/* TRADE LICENSE PANEL */}
                     <Label  className="text-slate-700">
                    Company Trade License <span className="text-red-500">*</span>                    
                  </Label>
             
                <div
                  className={`border-2 border-dashed rounded bg-white p-4 flex flex-col gap-3
                    ${
                      submitted.step3 &&
                      (!form.tradeLicenseNumber.trim() || !form.tradeLicense)
                        ? 'border-red-500'
                        : 'border-[#00AFEF]'
                    }`}
                >
                  {/* Trade License Number */}

                   <Label htmlFor="tradeLicenseNumber" className="text-slate-700">
  Trade license number <span className="text-red-500">*</span>
  
</Label>
                 <ShadInput
    id="tradeLicenseNumber"
    name="tradeLicenseNumber"
    type="text"
    required
    placeholder="Trade license number"
    value={form.tradeLicenseNumber}
    onChange={e => {
      setForm(prev => ({
        ...prev,
        tradeLicenseNumber: e.target.value,
      }))
      setTradeLicenseNumberError('')
    }}
    className="h-12 bg-white border border-slate-300 text-slate-900
      placeholder:text-slate-400
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
  />

                  {tradeLicenseNumberError && (
                    <p className="text-[11px] font-semibold text-red-600">
                      ⓘ {tradeLicenseNumberError}
                    </p>
                  )}

                  {/* Trade License Upload */}
                  
                 <FileInput
                  label="Upload Trade License Certificate"
                  required
                  file={form.tradeLicense}
                  borderClass="border-[#9ec5e5]"
                  onBeforeSelect={() => {
                    if (!form.tradeLicenseNumber.trim()) {
                      setTradeLicenseNumberError('Please enter Trade License Number')
                      return false   // stop picker
                    }
                    return true      //  allow picker
                  }}
                  onChange={file => {
                    setTradeLicenseNumberError('')
                    setForm(prev => ({ ...prev, tradeLicense: file }))
                  }}

                  existingFiles={step3FileNames} 
                />
                </div>

               {submitted.step3 &&
                (!form.tradeLicenseNumber.trim() || !form.tradeLicense) && (
                  <p className="flex items-center gap-1 text-[11px] font-semibold text-red-600 mt-1">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>Please upload Company Trade License</span>
                  </p>
                )}

                {/* REGISTRATION CERTIFICATE PANEL */}
                 <Label  className="text-slate-700">
                   Company Registration Certificate  <span className="text-red-500">*</span>                    
                  </Label>
              
              <div
                className={`border-2 border-dashed rounded bg-white p-4 flex flex-col gap-3
                  ${
                    submitted.step3 &&
                    (!form.compRegistrationNumber.trim() || !form.registrationCert)
                      ? 'border-red-500'
                      : 'border-[#00AFEF]'
                  }`}
              >
                {/* Registration Certificate Number */}

                   <Label htmlFor="compRegistrationNumber" className="text-slate-700">
                    Company registration number <span className="text-red-500">*</span>                    
                  </Label>
                <ShadInput
    id="compRegistrationNumber"
    name="compRegistrationNumber"
    type="text"
    required
    placeholder="Company registration number"
    value={form.compRegistrationNumber}
    onChange={e => {
      setForm(prev => ({
        ...prev,
        compRegistrationNumber: e.target.value,
      }))
      setRegistrationCertNumberError('')
    }}
    className="h-12 bg-white border border-slate-300 text-slate-900
      placeholder:text-slate-400
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
  />

                {registrationCertNumberError && (
                  <p className="text-[11px] font-semibold text-red-600">
                    ⓘ {registrationCertNumberError}
                  </p>
                )}

                {/* Registration Certificate Upload */}
              <FileInput
                label="Upload Registration Certificate"
                required
                file={form.registrationCert}
                borderClass="border-[#9ec5e5]"
                onBeforeSelect={() => {
                  if (!form.compRegistrationNumber.trim()) {
                    setRegistrationCertNumberError(
                      'Please enter Company Registration Number'
                    )
                    return false   //  block file picker
                  }
                  return true      //  allow picker
                }}
                onChange={file => {
                  setRegistrationCertNumberError('')
                  setForm(prev => ({ ...prev, registrationCert: file }))
                }}
                existingFiles={step3FileNames} 
              />
              </div>
              {submitted.step3 &&
                (!form.compRegistrationNumber.trim() || !form.registrationCert) && (
                  <p className="flex items-center gap-1 text-[11px] font-semibold text-red-600 mt-1">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>Please upload Company Registration Certificate</span>
                  </p>
                )}

                {/* PANEL TITLE */}

                 <Label  className="text-slate-700">
                    Tax Document Details  <span className="text-red-500">*</span>                    
                  </Label>
            
                <div className={`border-2 border-dashed rounded bg-white p-4 flex flex-col gap-4 ${getTaxPanelBorderClass()}`}>

                {/* TAX DOCUMENT TYPE */}
                <div className="flex flex-col gap-1">

                  <Label  className="text-slate-700">
                    Tax Document Type  <span className="text-red-500">*</span>                    
                  </Label>
                   
                   

                      <div className="relative">
                           <Select
  value={form.taxDocType || undefined}
  onValueChange={(value) => {
    setForm((prev) => ({
      ...prev,
      taxDocType: value,
      panTaxId: '',
      taxRegistrationDoc: null,
    }))

    setTaxIdError('')
  }}
>
  <SelectTrigger
    className={`w-full !h-12 bg-white border border-slate-300 
    text-slate-900 placeholder:text-slate-400 
    focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
    `}
  >
    <SelectValue placeholder="Select document type" />
  </SelectTrigger>

  <SelectContent position="popper" className="bg-white border-slate-200 z-[999]">
    <SelectItem value="GST">GST</SelectItem>
    <SelectItem value="PAN">PAN</SelectItem>
    <SelectItem value="VAT">VAT</SelectItem>
  </SelectContent>
</Select>

                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                              ▾
                            </span>
                      </div>
                </div>

                    {/* TAX NUMBER + UPLOAD (ONLY WHEN TYPE SELECTED) */}
                    {form.taxDocType && (
                      <>
                        {/* TAX NUMBER */}
                    
<Label htmlFor='panTaxId' className="text-slate-700">
    {form.taxDocType} Number <span className="text-red-500">*</span>
  </Label>

  <ShadInput
    id="panTaxId"
    name="panTaxId"
    type="text"
    required
    placeholder={`Enter ${form.taxDocType} Number`}
    value={form.panTaxId}
    onChange={e => {
      const value = e.target.value.toUpperCase()
      setForm(prev => ({
        ...prev,
        panTaxId: value,
      }))
      validateTaxIdLive(value, form.taxDocType)
    }}
    className="h-12 bg-white border border-slate-300 text-slate-900
      placeholder:text-slate-400
      focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
  />

                        {taxIdError && (
                          <p className={errorTextClass}>ⓘ {taxIdError}</p>                      
                        )}

                        {/* FILE UPLOAD */}
                        <FileInput
                          label={`Upload ${form.taxDocType} Document`}
                          required
                          file={form.taxRegistrationDoc}
                         borderClass="border-[#00AFEF]"
                          onBeforeSelect={() => {
                            if (!form.panTaxId.trim()) {
                              setTaxIdError(
                                `Please enter ${form.taxDocType} number`
                              )
                              return false   //  block file picker
                            }
                            return true      // allow picker
                          }}
                        onChange={file =>
                          setForm(prev => ({ ...prev, taxRegistrationDoc: file }))
                        }
                        existingFiles={step3FileNames} 
                      />
                      </>
                    )}

             </div>

             {submitted.step3 &&
              (
                !form.taxDocType ||
                !form.panTaxId.trim() ||
                !form.taxRegistrationDoc
              ) && (
                <p className="flex items-center gap-1 text-[11px] font-semibold text-red-600 mt-1">
                  <AlertCircle size={12} className="shrink-0" />
                  <span>Please upload Tax Document</span>
                </p>
              )}


                  <MultiFileInput
                    label="Other Documents"
                    files={form.otherDocs}
                    existingFiles={step3FileNames} 
                    onChange={files =>
                      setForm(prev => ({ ...prev, otherDocs: files }))
                    }
                  />
                
                  </>
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

                        const result = validateStep1()

                        if (result === 'EMPTY') {
                          setError('Kindly fill-up all the mandatory fields.')
                          return
                        }

                        if (result === 'INVALID') {
                          setError('Please fill the mandatory fields correctly')
                          return
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
                  onClick={() => {
                setSubmitted(prev => ({ ...prev, step2: true }))

                 const result = validateStep2()

                  if (result === 'EMPTY') {
                    setError('Kindly fill-up all the mandatory fields.')
                    return
                  }

                  if (result === 'INVALID') {
                    setError('Please fill the mandatory fields correctly')
                    return
                  }

                  setError('')
                  setStep(3)
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
            onClick={() => setStep(2)}
            
          >
            Back
          </PremiumButton>

          <PremiumButton
                      type="button"
                        variant="primary"
                        size="lg"
                        className='w-full'
          
           onClick={() => {
             setSubmitted(prev => ({ ...prev, step3: true }))

            const result = validateStep3()

            if (result === 'EMPTY') {
              setError('Kindly fill-up all the mandatory fields.')
              return
            }

            if (result === 'INVALID') {
              setError('Please fill the mandatory fields correctly')
              return
            }

            setError('')
            router.push('/')
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


