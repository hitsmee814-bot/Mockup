'use client'

    /* ================= IMPORTS ================= */

import { parsePhoneNumberFromString } from 'libphonenumber-js'
import React,{ useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { passwordStrength } from 'check-password-strength'
import Image from "next/image";
import logo from "../../assets/images/logoPrimary.png"
import supplierPic from "../../assets/images/traveling-concept-with-landmarks.jpg"
import { Eye, EyeOff, AlertCircle } from "lucide-react";

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

}


/* ================= CONSTANTS ================= */   
  
  const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

    const WEBSITE_REGEX =
  /^(https?:\/\/)?((([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.)+[A-Za-z]{2,})(:\d{1,5})?(\/[^\s]*)?$/;

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
const footerButtonClass =  "flex-1 py-2 rounded text-white text-sm font-medium bg-[#00AFEF] text-white";
const MAX_FILE_SIZE_MB = 15
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
]

const inputClass = `h-[38px] w-full rounded border border-[#00AFEF] bg-white px-3 
   ${inputTextClass} ${placeholderClass} focus:outline-none`;

const COUNTRY_CODES = [
  { code: '+1', label: 'US' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'IN' },
  { code: '+61', label: 'AU' },
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
      const dropdownRef = useRef<HTMLDivElement>(null)
      const serviceTriggerRef = useRef<HTMLDivElement>(null)
      const serviceDropdownRef = useRef<HTMLDivElement>(null)
      const [hidePasswordEye, setHidePasswordEye] = useState(0)
      const [step, setStep] = useState<1 | 2 | 3>(1)
      const [error, setError] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const [usernameError, setUsernameError] = useState('')
      const [show, setShow] = useState(false)
      const usernameValid = (u: string) =>  /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test(u)
      const [step1Submitted, setStep1Submitted] = useState(false)
      const [step2Submitted, setStep2Submitted] = useState(false)
      const [step3Submitted, setStep3Submitted] = useState(false)
      const [passwordStrengthInfo, setPasswordStrengthInfo] = useState<{
              id: number
              value: string
            } | null>(null)

      const [serviceOpen, setServiceOpen] = useState(false)
      const [emailError, setEmailError] = useState('')
      const [confirmPasswordError, setConfirmPasswordError] = useState('')
      const [phoneError, setPhoneError] = useState('')
      const [taxIdError, setTaxIdError] = useState('')
      const [websiteError, setWebsiteError] = useState('')
      

  
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
          registrationCert: null,
          taxDocType: '',
          taxRegistrationDoc: null,
          otherDocs: [],
          })

  /* CLOSE SERVICE DROPDOWN */
  
    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node

    if (
      serviceTriggerRef.current &&
      !serviceTriggerRef.current.contains(target) &&
      serviceDropdownRef.current &&
      !serviceDropdownRef.current.contains(target)
    ) {
      setServiceOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)}, [])

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
      const { name, value } = e.target
      setForm(prev => ({ ...prev, [name]: value }))
      if (step1Submitted) {
        setError('')
      }
      if (step2Submitted) {
          setError('')
        }
        if (step3Submitted) {
          setError('')
        }

        // USERNAME  VALIDATION
      if (name === 'username') {
        // Clear error if empty
        if (!value) {
          setUsernameError('')
          return
        }

        // Validate format
        if (!usernameValid(value)) {
          setUsernameError(
            'Username must be 6-16 characters and start with a letter.'
          )
        } else {
          setUsernameError('')
        }
  }

          if (name === 'email') {
        validateEmailLive(value)
      }

      if (name === 'phone') {
        validatePhoneLive(value, form.countryCode)
      }

      if (name === 'countryCode') {
        validatePhoneLive(form.phone, value)
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

//     const getStep1BorderClass = (
//   isMandatory: boolean,
//   hasError: boolean,
//   value: string
// ) => {
//   if (step1Submitted && isMandatory && (!value || hasError)) {
//     return 'border-red-500'
//   }
//   return 'border-[#00AFEF]'
// }
const getStep1BorderClass = (
  isMandatory: boolean,
  hasError: boolean,
  value: string
) => {
  if (
    step1Submitted &&
    isMandatory &&
    (!value.trim() || hasError)
  ) {
    return 'border-red-500'
  }
  return 'border-[#00AFEF]'
}


const getStep2BorderClass = (
  isMandatory: boolean,
  value: string | string[],
  hasError = false
) => {
  const isEmpty =
    typeof value === 'string'
      ? !value.trim()
      : value.length === 0

  if (step2Submitted && isMandatory && (isEmpty || hasError)) {
    return 'border-red-500'
  }

  return 'border-[#00AFEF]'
}




const getStep3FileBorderClass = (hasValue: boolean) => {
  if (step3Submitted && !hasValue) {
    return 'border-red-500'
  }
  return 'border-[#00AFEF]'
}

const getTaxTypeBorderClass = () => {
  if (step3Submitted && !form.taxDocType) {
    return 'border-red-500'
  }
  return 'border-[#00AFEF]'
}

const getTaxNumberBorderClass = () => {
  if (
    step3Submitted &&
    (!form.panTaxId.trim() || taxIdError)
  ) {
    return 'border-red-500'
  }
  return 'border-[#00AFEF]'
}

const getTaxFileBorderClass = () => {
  if (step3Submitted && !form.taxRegistrationDoc) {
    return 'border-red-500'
  }
  return 'border-[#00AFEF]'
}

const getTaxPanelBorderClass = () => {
  if (
    step3Submitted &&
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
          
        const validatePhoneLive = (phone: string, countryCode: string) => {
  // Clear error when empty
  if (!phone) {
    setPhoneError('')
    return
  }

  const digitsOnly = phone.replace(/\D/g, '')

  //  Start validation immediately
  if (digitsOnly.length < 10) {
    setPhoneError('Please enter a valid phone number')
    return
  }

  const fullNumber = `${countryCode}${digitsOnly}`
  const phoneNumber = parsePhoneNumberFromString(fullNumber)

  if (!phoneNumber || !phoneNumber.isValid()) {
    setPhoneError('Please enter a valid phone number')
  } else {
    setPhoneError('')
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

const validateEmailLive = (value: string) => {
  // If field is cleared → clear error
  if (!value) {
    setEmailError('')
    return
  }

  // Live aggressive validation (same as username)
  if (!EMAIL_REGEX.test(value)) {
    setEmailError('Please enter valid email address')
  } else {
    setEmailError('')
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


const validatePhoneNumber = () => {
  const fullNumber = `${form.countryCode}${form.phone}`

  const phoneNumber = parsePhoneNumberFromString(fullNumber)

  if (!phoneNumber || !phoneNumber.isValid()) {
    return 'Please enter a valid phone number'
  }

  return ''
}
 const toggleService = (option: string) => {
  setForm(prev => ({
    ...prev,
    serviceTypes: prev.serviceTypes.includes(option)
      ? prev.serviceTypes.filter(o => o !== option)
      : [...prev.serviceTypes, option],
  }))
}

const hasEmptyMandatoryStep1 = () => {
  return (
    !form.firstName.trim() ||
    !form.lastName.trim() ||
    !form.email.trim() ||
    !form.phone.trim() ||
    !form.username.trim() ||
    !form.password ||
    !form.confirmPassword
  )
}

const hasEmptyMandatoryStep2 = () => {
  return (
    !form.supplierLegalName.trim() ||
    !form.tradeName.trim() ||
    form.serviceTypes.length === 0 ||
    !form.countryOfRegistration ||
    !form.websiteUrl.trim()
  )
}

const hasEmptyMandatoryStep3 = () => {
  return (
    !form.tradeLicense ||
    !form.registrationCert ||
    !form.taxDocType ||
    !form.panTaxId.trim() ||
    !form.taxRegistrationDoc
  )
}


const validateStep1 = () => {
  // 1 Empty mandatory fields
  if (hasEmptyMandatoryStep1()) {
    return 'EMPTY'
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
  //  Empty mandatory fields
  if (hasEmptyMandatoryStep2()) {
    return 'EMPTY'
  }

  // Invalid field values
  if (websiteError) {
    return 'INVALID'
  }

  return 'OK'
}



const validateStep3 = () => {
  //  Missing mandatory fields
  if (hasEmptyMandatoryStep3()) {
    return 'EMPTY'
  }

  //  Invalid values
  if (taxIdError) {
    return 'INVALID'
  }

  return 'OK'
}





  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-4 pt-20">

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
        

        <div className="bg-white rounded-[4px] border border-[#f1f1f1] grid grid-cols-2 max-w-4xl w-full h-[85vh]">
      
          {/* LEFT IMAGE SECTION */}
          <div className="hidden md:block relative">
            <Image src={supplierPic} alt="Signup" fill className="object-cover" />
            <div className="absolute inset-0 bg-blue-900/10"></div>          
          </div>

             {/* RIGHT FORM SECTION */}
             <div className="h-full">
                  <form className="p-6 flex flex-col h-[85vh]" >
                    {/* HEADER – FIXED */}
                      <div className="shrink-0">
                            <h2 className="text-base font-semibold text-center mb-1 text-[#00AFEF]">
                              Supplier Signup
                            </h2>

                          <StepIndicator step={step} />
                            {error && (
                              <div className="bg-red-100 border  text-red-700 px-3 py-2 rounded mb-3 text-xs">
                                {error}
                              </div>
                            )}
                    </div>
                    
                    {/* divider */}
                     <div className="mx-12 mb-5 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>   

            {/* body*/}
       <div  className="flex-1  overflow-y-auto form-scroll overscroll-contain  pr-1 pb-2 " >
         
              <div className="space-y-3">            
                {step === 1 && (
                  <>
                    <Input
                    label="First Name"
                    required
                    placeholder="Enter first name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={getStep1BorderClass(true, false, form.firstName)}
                  />
                   
                    <Input label="Middle Name (optional)" placeholder="Enter middle name" name="middleName"   value={form.middleName} onChange={handleChange} />
                    
                    <Input
                    label="Last Name"
                    required
                    placeholder="Enter last name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={getStep1BorderClass(true, false, form.lastName)}
                  />
                   
                    <Input
                        label="Email"
                        required
                        placeholder="name@company.com"
                        name="email"
                        //autoComplete="off"
                        value={form.email}
                        onChange={handleChange}
                        tooltip="Enter a valid email address like name@example.com"
                        className={getStep1BorderClass(true, !!emailError, form.email)}
                      />
                     <ErrorMessage message={emailError} />

                      {/* PHONE */}
                      <div >
                          <label className={`${labelClass} flex items-center gap-1`}>
                            Phone Number <span className="text-red-500">*</span>

                            <TooltipIcon
                          id="tooltip-phone"
                          content="Please enter valid phone number"
                        />
                          </label>
                          <div
                              className={`flex h-[38px] rounded border bg-white
                                ${
                                  step1Submitted && (phoneError || !form.phone)
                                    ? 'border-red-500'
                                    : 'border-[#00AFEF]'
                                }
                              `}
                            >
                            <select
                              name="countryCode"
                              value={form.countryCode}
                              onChange={handleChange}
                               className="px-3 text-[12px] border-r border-[#9ec5e5]">
                              {COUNTRY_CODES.map(c => (
                                <option key={c.code} value={c.code}>
                                  {c.label} {c.code}
                                </option>
                              ))}
                              </select>
                              <input
                                name="phone"                      
                                value={form.phone}
                                onChange={handleChange}                                
                                placeholder="Enter phone number"
                                maxLength={10}
                                className="flex-1 h-full px-3 text-[12px] text-black caret-black outline-none"
                                inputMode="numeric"/>
                          </div>
                            <ErrorMessage message={phoneError} />
                      </div>
                                                                                   
                       
                        <Input
                          label="Username"
                          required
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          tooltip="Must start with a letter, followed by underscores or numbers. 6–16 characters allowed."
                          className={getStep1BorderClass(true, !!usernameError, form.username)}
                        />
                        <ErrorMessage message={usernameError} />

                           <Input
                            label="Password"
                            required
                            placeholder="Enter strong password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={handleChange}                            
                            onCopy={blockClipboard}
                            onCut={blockClipboard}
                            onPaste={blockClipboard}
                            onContextMenu={blockContextMenu}
                            showEye
                            forceHideEye={hidePasswordEye}
                            tooltip="Password must be at least 8 characters with uppercase, lowercase, number & symbol"
                              className={getStep1BorderClass(true, !!passwordError, form.password)}
                          />
                      
                             <ErrorMessage message={passwordError} />    
                          
                          {form.password && !passwordError && (
                          <PasswordStrengthMeter strength={passwordStrengthInfo} />
                          )}

                    

                        <Input
                            label="Re-Type Password"
                            required
                            placeholder="Re-enter password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={form.confirmPassword}                           
                            onCopy={blockClipboard}
                            onCut={blockClipboard}
                            onPaste={blockClipboard}
                            onContextMenu={blockContextMenu}
                              //  Covers mouse click + tab navigation
                            onFocusCapture={() => setHidePasswordEye(v => v + 1)}

                            //  Covers typing, delete, backspace, paste, mobile keyboards
                            onInput={() => setHidePasswordEye(v => v + 1)}

                            //  KEEP THIS – your existing validation logic
                            onChange={handleChange}
                            className={getStep1BorderClass(
                              true,
                              !!confirmPasswordError,
                              form.confirmPassword
                            )}
                          />
                          <ErrorMessage message={confirmPasswordError} />   
                                        
                        </>
                      )}

                {step === 2 && (
                  <>
                    <Input label="Supplier Legal Name" required placeholder="Registered legal name" name="supplierLegalName"
                     value={form.supplierLegalName} onChange={handleChange} className={getStep2BorderClass(true, form.supplierLegalName)}/>
                   
                    <Input label="Trade Name" required placeholder="Business / brand name" 
                    name="tradeName" value={form.tradeName} onChange={handleChange}className={getStep2BorderClass(true, form.tradeName)} />

                    {/* SERVICE TYPE */}
                    <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
                    <label className={labelClass} >
                    Service Type <span className="text-red-500">*</span>
                    </label>

                    {/* INPUT AREA WITH CHIPS */}
                  <div
                      ref={serviceTriggerRef}
                      className={`${inputClass}
                       flex flex-wrap items-center gap-1 cursor-pointer ${getStep2BorderClass(true, form.serviceTypes)}`}
                      onClick={() => setServiceOpen(prev => !prev)}>

                    {form.serviceTypes.length === 0 && (
                      <span className="text-gray-400 text-[12px]">
                        Select service types
                      </span>
                    )}

                    {form.serviceTypes.map(type => (
                      <span
                        key={type}
                        className="flex items-center gap-1 bg-white-100 text-gray-700 px-2 py-[2px] rounded-full text-[12px]"
                        onClick={e => e.stopPropagation()}
                      >
                        {type}
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation()
                            toggleService(type)
                          }}
                        className="text-red-500 hover:text-red-700 hover:scale-110 transition font-bold"
                          aria-label="Remove service type"
                        >
                          ×
                        </button>
                      </span>
                    ))}

                     <span className="ml-auto text-xs text-gray-500">▾</span>
                </div>

             {/* DROPDOWN LIST */}
            {serviceOpen && (
               <div
                    ref={serviceDropdownRef}          
                    className="mt-1 rounded border border-[#00AFEF] bg-white max-h-40 overflow-y-auto">
                    {SERVICE_OPTIONS.map(option => {
                      const active = form.serviceTypes.includes(option)
                      return (
                        <div
                            key={option}
                            onClick={() => toggleService(option)}
                            className={`px-3 py-2 text-xs cursor-pointer transition-colors
                            ${
                              active
                                ? 'bg-blue-200 font-medium text-gray-900'
                                : 'bg-white'
                            }
                            hover:bg-blue-100`}
                            >
                            {option}
                      </div>
                            )
                          })}
                </div>
                  )}
            </div>

                {/* COUNTRY */}
                <div className="flex flex-col gap-1">
                      <label className={labelClass}>
                        Country of Registration <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                            name="countryOfRegistration"
                            value={form.countryOfRegistration}
                            onChange={handleChange}
                            className={`${inputClass} appearance-none bg-white cursor-pointer pr-8  ${getStep2BorderClass(true, form.countryOfRegistration)}`}>
                            <option value="" disabled hidden>Select country</option>
                            {REG_COUNTRIES.map(c => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                        </select>

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                          ▾
                        </span>
                    </div>

                </div>

                <Input
                  label="Website URL"
                  required
                  placeholder="Company website"
                  name="websiteUrl"
                  value={form.websiteUrl}
                  onChange={handleChange} 
                  className={getStep2BorderClass(
                    true,
                    form.websiteUrl,
                    !!websiteError
                  )}
                  tooltip="Example: www.company.com"
                />

                 <ErrorMessage message={websiteError} />

             
              </>
           )}
            {step === 3 && (
            <>
                <FileInput
                  label="Company Trade License"
                  required
                  file={form.tradeLicense}
                   borderClass={getStep3FileBorderClass(!!form.tradeLicense)}
                  onChange={file =>
                    setForm(prev => ({ ...prev, tradeLicense: file }))
                  }
                />

                <FileInput
                  label="Company Registration Certificate"
                  required
                  file={form.registrationCert}
                  borderClass={getStep3FileBorderClass(!!form.registrationCert)}
                  onChange={file =>
                    setForm(prev => ({ ...prev, registrationCert: file }))
                  }
                />

                {/* PANEL TITLE */}
                <label className={labelClass}>
                  Tax Document Details <span className="text-red-500">*</span>
                </label>

                <div className={`border-2 border-dashed rounded bg-white p-4 flex flex-col gap-4 ${getTaxPanelBorderClass()}`}>

                {/* TAX DOCUMENT TYPE */}
                <div className="flex flex-col gap-1">
                    <label className={labelClass}>
                      Tax Document Type <span className="text-red-500">*</span>
                    </label>

                      <div className="relative">
                            <select
                              name="taxDocType"
                              value={form.taxDocType}
                              onChange={e => {
                                const value = e.target.value

                                setForm(prev => ({
                                  ...prev,
                                  taxDocType: value,
                                  panTaxId: '',                 
                                  taxRegistrationDoc: null,     
                                }))

                              setTaxIdError('')               
                            }}
                            className={`${inputClass} appearance-none  ${getTaxTypeBorderClass()}`}>
                            <option value="" disabled hidden>
                              Select document type
                            </option>
                            <option value="GST">GST</option>
                            <option value="PAN">PAN</option>
                            <option value="VAT">VAT</option>
                            </select>

                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                              ▾
                            </span>
                      </div>
                </div>

                    {/* TAX NUMBER + UPLOAD (ONLY WHEN TYPE SELECTED) */}
                    {form.taxDocType && (
                      <>
                        {/* TAX NUMBER */}
                        <Input
                          label={`${form.taxDocType} Number`}
                          required
                          placeholder={`Enter ${form.taxDocType} Number`}
                          name="panTaxId"
                          value={form.panTaxId}
                          onChange={e => {
                            const value = e.target.value.toUpperCase()
                            setForm(prev => ({
                              ...prev,
                              panTaxId:value,
                            }))
                            validateTaxIdLive(value, form.taxDocType)
                          }}

                         className={getTaxNumberBorderClass()}
                        />

                        {taxIdError && (
                          <p className={errorTextClass}>ⓘ {taxIdError}</p>                      
                        )}

                        {/* FILE UPLOAD */}
                        <FileInput
                          label={`Upload ${form.taxDocType} Document`}
                          required
                          file={form.taxRegistrationDoc}
                          borderClass={getTaxFileBorderClass()}
                          onChange={file =>
                            setForm(prev => ({ ...prev, taxRegistrationDoc: file }))
                          }
                        />
                      </>
                    )}

             </div>
                  <MultiFileInput
                    label="Other Documents"
                    files={form.otherDocs}
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
              <div className="flex justify-between gap-4 pt-4">

                    <button
                      type="button"
                      onClick={() => router.push('/')}
                      className={`${footerButtonClass} bg-[#E62800]`}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                    

                      onClick={() => {
                        setStep1Submitted(true)

                        const result = validateStep1()

                        if (result === 'EMPTY') {
                          setError('Please fill all mandatory fields (marked with *)')
                          return
                        }

                        if (result === 'INVALID') {
                          setError('Please fill the mandatory fields correctly')
                          return
                        }

                        setError('')
                        setStep(2)
                      }}
                    className={`${footerButtonClass} bg-[#00afef]` }
                    >
                      Next
                  </button>
                                  
                  </div>
                  )}

              {step === 2 && (
              <div className="flex justify-between gap-4 pt-4">

                    <button
                    type="button"
                    onClick={() => {
                     
                      setPasswordError('')
                       setUsernameError('') 
                      setError('')
                      setStep(1)
                    }}
                     className={`${footerButtonClass} bg-[#FBAE30]`}>
                    Back
                  </button>


                  <button
                    type="button"
                   
                    onClick={() => {
                  setStep2Submitted(true)

                  const result = validateStep2()

                  if (result === 'EMPTY') {
                    setError('Please fill all mandatory fields (marked with *)')
                    return
                  }

                  if (result === 'INVALID') {
                    setError('Please fill the mandatory fields correctly')
                    return
                  }

                  setError('')
                  setStep(3)
                }}
                     className={`${footerButtonClass} bg-[#00afef]`}
                  >
                    Next
                  </button>
                </div>
              )}

          {step === 3 && (
           <div className="flex justify-between gap-4 pt-4">

          <button
            type="button"
            onClick={() => setStep(2)}
             className={`${footerButtonClass} bg-[#FBAE30]`}
          >
            Back
          </button>

          <button
            type="button"
          
            onClick={() => {
            setStep3Submitted(true)

            const result = validateStep3()

            if (result === 'EMPTY') {
              setError('Please fill all mandatory fields (marked with *)')
              return
            }

            if (result === 'INVALID') {
              setError('Please fill the mandatory fields correctly')
              return
            }

            setError('')
            router.push('/')
          }}
             className={`${footerButtonClass} bg-[#00afef]`}
          >
            Register
          </button>
        </div>
       )}
      </div>
     
      </form>
      </div>
      </div>

      <style jsx>{`
  .form-scroll {
  scrollbar-width: thin;
  scrollbar-color: #00AFEF transparent;
}

.form-scroll::-webkit-scrollbar {
  width: 6px;
}

.form-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.form-scroll::-webkit-scrollbar-thumb {
  background-color: #00AFEF;
  border-radius: 9999px;
}
`}</style>
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
      type = 'text',
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
        setShow(false)}, [forceHideEye])
      const tooltipId = `tooltip-${name}`
      return (
        <div className="flex flex-col gap-1">
          <label className={`${labelClass} flex items-center gap-1`}>
            {label} {required && <span className="text-red-500">*</span>}

            {tooltip && (
              <TooltipIcon
              id={`tooltip-${name}`}
              content={tooltip}
            />
            )}

          </label>

          <div className="relative">
      <input
        {...props}
        name={name}
        type={showEye && show ? 'text' : type}
        className={`${inputClass} pr-9 ${props.className ?? ''}`}
        onChange={e => {
          //  Hide password as soon as user types
          if (show) setShow(false)

          // Call original onChange (important)
          props.onChange?.(e)
        }}
      />

      {showEye && (
        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF] transition"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
        </div>
      )
    }

    function FileInput({
      label,
      required,
      file,
      onChange,
      borderClass = 'border-[#00AFEF]',
    }: {
      label: string
      required?: boolean
      file?: File | null
      onChange: (file: File | null) => void
      borderClass?: string
    }) {
      const [error, setError] = useState('')

      const handleFileChange = (file: File | null) => {
        if (!file) {
          setError('')
          onChange(null)
          return
        }

        //  File type validation
        if (!ALLOWED_TYPES.includes(file.type)) {
          setError('Only PDF or JPG files are allowed')
          return
        }

        //  File size validation
        const fileSizeMB = file.size / (1024 * 1024)
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          setError('File size must be less than 15 MB')
          return
        }

        //  Valid file
        setError('')
        onChange(file)
      }

      return (
        <div className="flex flex-col gap-1">
        <label className={labelClass}>

            {label} {required && <span className="text-red-500">*</span>}
          </label>

          <div className={`border-2 border-dashed rounded bg-white p-2 transition ${borderClass}`}>
            {!file ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <UploadIcon
                className="h-5 w-5 text-blue-500"
                strokeWidth={1.5}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    Click to upload
                  </span>
                  <span className="text-xs text-gray-500">
                    PDF / JPG up to 15MB
                  </span>
                </div>

                <input
                  type="file"
                  hidden
                  accept=".pdf,.jpg,.jpeg"
                  onChange={e =>
                    handleFileChange(e.target.files?.[0] || null)
                  }
                />
              </label>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Paperclip className="h-4 w-4 text-gray-500 shrink-0" />
                <span className="truncate max-w-[200px]">{file.name}</span>
            </div>
                <button
              type="button"
              onClick={() => handleFileChange(null)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Remove file"
              >
              <X className="h-4 w-4" />
              </button>
              </div>
              )}
            </div>
            

          {/*  Error message */}
          {error && (
            <p className="text-red-500 text-[11px] mt-1">{error}</p>
          )}
        </div>
      )
    }




    function MultiFileInput({
      label,
      files,
      maxFiles = 5,
      onChange,
    }: {
      label: string
    files: NamedDocument[]
      maxFiles?: number
      onChange: (files: NamedDocument[]) => void
    }) {
      const [error, setError] = useState('')
      const [open, setOpen] = useState(false)
      const [tempFiles, setTempFiles] = useState<File[]>([])
      const fileInputRef = useRef<HTMLInputElement>(null)
      const tooltipId = 'other-docs-tooltip' 
      const [popupError, setPopupError] = useState('')
      const [documentName, setDocumentName] = useState('')
      const documentNameRef = useRef<HTMLInputElement>(null)
      const [maxLimitError, setMaxLimitError] = useState('')
      
      

      const handlePopupFileChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const fileList = e.target.files
      if (!fileList || fileList.length === 0) return

      const filesArray = Array.from(fileList)

      //  File type validation
      const invalidType = filesArray.find(
        file => !ALLOWED_TYPES.includes(file.type)
      )
      if (invalidType) {
        setPopupError('Only PDF or JPG files are allowed')
        e.target.value = ''
        return
      }

      //  File size validation
      const oversized = filesArray.find(
        file => file.size / (1024 * 1024) > MAX_FILE_SIZE_MB
      )
      if (oversized) {
        setPopupError('Each file must be less than 15 MB')
        e.target.value = ''
        return
      }

      //  Valid files
      setPopupError('')
      setTempFiles(filesArray)
    }




    useEffect(() => {
    if (open) {
      setTempFiles([])
      setDocumentName('')
      setPopupError('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [open])




  const addFiles = () => {
  // 1️ Document name required
  if (!documentName.trim()) {
    setPopupError('Please enter document name')
    documentNameRef.current?.focus()
    return
  }

  // 2️⃣Files mandatory
  if (tempFiles.length === 0) {
    setPopupError('Please upload at least one document')
    return
  }


  // 2️ Duplicate file check vs existing list
  const existingFileNames = files.map(
    doc => doc.file.name.toLowerCase()
  )
  const existingDocNames = files.map(
  doc => doc.name.toLowerCase()
)

if (existingDocNames.includes(documentName.trim().toLowerCase())) {
  setPopupError('Document with same name has already been uploaded')
  return
}
  const duplicate = tempFiles.find(file =>
    existingFileNames.includes(file.name.toLowerCase())
  )

  if (duplicate) {
    setPopupError(`File "${duplicate.name}" is already uploaded`)
    return
  }

  // 3️ File type validation
  const invalidType = tempFiles.find(
    file => !ALLOWED_TYPES.includes(file.type)
  )

  if (invalidType) {
    setPopupError('Only PDF or JPG files are allowed')
    return
  }

  // 4️ File size validation
  const oversized = tempFiles.find(
    file => file.size / (1024 * 1024) > MAX_FILE_SIZE_MB
  )

  if (oversized) {
    setPopupError('Each file must be less than 15 MB')
    return
  }

  // 5️ Max file count
  if (files.length + tempFiles.length > maxFiles) {
    setPopupError(`Maximum ${maxFiles} documents allowed`)
    return
  }

  //  SUCCESS
  const newDocs: NamedDocument[] = tempFiles.map(file => ({
    file,
    name: documentName.trim(),
  }))

  onChange([...files, ...newDocs])

  setTempFiles([])
  setDocumentName('')
  setPopupError('')
  setOpen(false)
  setMaxLimitError('') 
}



 
  const removeFile = (index: number) => {
  onChange(files.filter((_, i) => i !== index))
  setMaxLimitError('')
}
  return (
    <>
      {/* LABEL + BUTTON */}
      <div className="flex items-center justify-between">
    <label className={`${labelClass} flex items-center gap-1`}>
  {label}

  <span
    data-tooltip-id={tooltipId}
    data-tooltip-content="A maximum of five documents can be uploaded."
    className="text-blue-500 text-[11px] cursor-pointer"
  >
    ⓘ
  </span>
</label>


<Tooltip
  id={tooltipId}
  place="top"
  style={{
    fontSize: '11px',
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: '#0f172a',
  }}
/>

       
      <div className="flex flex-col items-end">
        <button
        type="button"
        onClick={() => {
          if (files.length >= maxFiles) {
            setMaxLimitError('You can upload up to five documents.')
            return
          }

    setMaxLimitError('')
    setPopupError('')
    setOpen(true)
  }}
  className="px-3 py-1.5 rounded text-white text-sm bg-[#00afef]"
>
  Upload
</button>
{maxLimitError && (
      <p className="text-[11px] text-red-600 mt-1 font-semibold">
        {maxLimitError}
      </p>
    )}
</div>
      </div>

      {/* FILE LIST */}
      <div className="border border-[#00AFEF] rounded bg-white p-3">
        {files.length === 0 ? (
          <p className="text-xs text-gray-400">
            No documents uploaded ({files.length}/{maxFiles})
          </p>
        ) : (
          <div className="space-y-2">
         {files.map((doc, index) => (
  <div
    key={index}
    className="flex items-start justify-between bg-gray-50 rounded px-3 py-2 text-sm"
  >
    <div className="flex gap-2 truncate">
      <Paperclip className="h-4 w-4 text-gray-500 mt-1 shrink-0" />

      <div className="flex flex-col truncate">
        <span className="font-medium text-gray-800 truncate max-w-[220px]">
          {doc.name}
        </span>
        <span className="text-[11px] text-gray-500 truncate max-w-[220px]">
          {doc.file.name}
        </span>
      </div>
    </div>

    <button
      type="button"
      onClick={() => removeFile(index)}
      className="text-gray-400 hover:text-red-600"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
))}

          </div>
        )}
      </div>

      

      {/* POPUP PANEL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
         
            <div className="bg-white rounded-[4px] w-[360px] p-4 border border-[#f1f1f1]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-[#00AFEF]">
              Upload Documents
            </h3>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
  </div>
           {/* Document Name Input */}
  <div className="flex flex-col gap-1 mb-4">
  <label className={labelClass}>

    Document Name <span className="text-red-500">*</span>
  </label>
  <input
  ref={documentNameRef}
  type="text"
  value={documentName}
  onChange={e => {
    setDocumentName(e.target.value)
    if (popupError) setPopupError('')
  }}
  className="h-[38px] w-full rounded border border-[#9ec5e5] bg-white px-3 text-[12px]  focus:outline-none
  focus:border-[#00AFEF] focus:ring-0"/>


</div>

{/* BODY – Upload box */}
<div className="border-2 border-dashed border-[#00AFEF] rounded bg-white p-4 transition">
  {/* CLICK AREA (only when no file) */}
  {tempFiles.length === 0 && (
    <div
      className="flex items-center gap-3 cursor-pointer hover:border-blue-400"
      onClick={() => {
        if (!documentName.trim()) {
          setPopupError('Please enter document name first')
          documentNameRef.current?.focus()
          return
        }

        setPopupError('')
        fileInputRef.current?.click()
      }}
    >
      <UploadIcon className="h-6 w-6 text-blue-500" strokeWidth={1.5} />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">
          Click to upload documents
        </span>
        <span className="text-xs text-gray-500">
          PDF / JPG up to 15MB
        </span>
      </div>
    </div>
  )}

  {/* FILE PREVIEW (same dashed box) */}
  {tempFiles.map((file, index) => (
    <div
      key={index}
      className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 text-sm"
    >
      <div className="flex gap-2 truncate">
        <Paperclip className="h-4 w-4 text-gray-500 shrink-0" />
        <div className="flex flex-col truncate">
          <span className="font-medium text-gray-800 truncate max-w-[220px]">
            {documentName}
          </span>
          <span className="text-[11px] text-gray-500 truncate max-w-[220px]">
            {file.name}
          </span>
        </div>
      </div>

      {/* ❌ REMOVE FILE */}
      <button
        type="button"
        onClick={() =>
          setTempFiles(prev => prev.filter((_, i) => i !== index))
        }
        className="text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Remove file"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  ))}

  {/* HIDDEN INPUT */}
  <input
    ref={fileInputRef}
    type="file"
    hidden
    multiple
    accept=".pdf,.jpg,.jpeg"
    onChange={handlePopupFileChange}
  />
</div>



{popupError && (
  <p className="text-red-500 text-[11px] mt-2">
    {popupError}
  </p>
)}


  {/* FOOTER */}
  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="px-3 py-1.5 text-sm text-white border rounded bg-[#E62800]"
    >
      Cancel
    </button>

  <button
  type="button"
  onClick={addFiles}
  disabled={tempFiles.length === 0 || !documentName.trim()}
  className="px-3 py-1.5 text-sm rounded bg-[#00afef] text-white disabled:opacity-50"
>
  Save
</button>


  </div>
  </div>
  <Tooltip
  id="doc-name-tooltip"
  place="top"
  style={{
    fontSize: '11px',
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: '#0f172a',
  }}
/>

        </div>
          
      )}
    </>
  )
}

