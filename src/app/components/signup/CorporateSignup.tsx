'use client'

import React, { useState, useEffect } from 'react' // Import useEffect 123
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { AlertCircle } from 'lucide-react'
import logo from '../../assets/images/logoPrimary.png'
import corporatePic from '../../assets/images/traveling-concept-with-landmarks.jpg'

/* ================= CONSTANTS ================= */
const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

const labelClass = 'text-[12px] font-medium text-[#1A1A1A]'
const inputClass =
  'h-[38px] w-full rounded border bg-white px-3 text-[12px] text-black placeholder:text-gray-400 focus:outline-none'
const errorTextClass =
  'mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-600'
const footerButtonClass =
  'flex-1 py-2 rounded text-white text-sm font-medium'

const COUNTRY_CODES = [
  { code: '+1', label: 'US' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'IN' },
  { code: '+61', label: 'AU' },
]

/* ================= TYPES ================= */
type FormData = {
  email: string
  countryCode: string
  phone: string
  organisationId: string
}

type Errors = {
  email?: string
  phone?: string
  organisationId?: string
}

/* ================= TOOLTIP ICON ================= */
function TooltipIcon({ id, content }: { id: string; content: string }) {
  return (
    <>
      <span
        data-tooltip-id={id}
        data-tooltip-content={content}
        className="text-[#00AFEF] text-[11px] cursor-pointer"
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

/* ================= ERROR MESSAGE ================= */
function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className={errorTextClass}>
      <AlertCircle size={12} />
      {message}
    </p>
  )
}

/* ================= MAIN ================= */
export default function CorporateSignup() {
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    email: '',
    countryCode: '+91',
    phone: '',
    organisationId: '',
  })

  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  // New state to track if a field has been touched
  const [touched, setTouched] = useState<{
    email: boolean
    phone: boolean
    organisationId: boolean
  }>({
    email: false,
    phone: false,
    organisationId: false,
  })

  // Validate the form whenever the form state changes, but only if the form has been submitted
  useEffect(() => {
    if (isSubmitted) {
      validateForm(form)
    }
  }, [form, isSubmitted])

  /* ================= VALIDATION ================= */



const validateEmailLive = (email: string): string | undefined => {
  if (!email) return undefined // clear error when empty

  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address'
  }

  const domain = email.split('@')[1]
  if (domain && domain !== domain.toLowerCase()) {
    return 'Email domain must be lowercase'
  }

  return undefined
}

const validatePhoneLive = (
  phone: string,
  countryCode: string
): string | undefined => {
  if (!phone) return undefined // clear error when empty

  const parsed = parsePhoneNumberFromString(`${countryCode}${phone}`)
  if (!parsed || !parsed.isValid()) {
    return 'Please enter a valid phone number'
  }

  return undefined
}



const validateForm = (data: FormData) => {
  const newErrors: Errors = {}

  // Required checks only
// Required checks
if (!data.email) newErrors.email = 'Required'
if (!data.phone) newErrors.phone = 'Required'
if (!data.organisationId) newErrors.organisationId = 'Required'

  // Format checks (submit safety net)
  const emailError = validateEmailLive(data.email)
 if (emailError && data.email) newErrors.email = emailError

  const phoneError = validatePhoneLive(data.phone, data.countryCode)
  if (phoneError && data.phone) newErrors.phone = phoneError

  setErrors(newErrors)
  return newErrors
}

  /* ================= HANDLERS ================= */
 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target
  const updatedForm = { ...form, [name]: value }
  setForm(updatedForm)

  setTouched(prev => ({ ...prev, [name]: true }))

  //  Live validation
  if (name === 'email') {
    setErrors(prev => ({
      ...prev,
      email: validateEmailLive(value),
    }))
  }

  if (name === 'phone' || name === 'countryCode') {
    setErrors(prev => ({
      ...prev,
      phone: validatePhoneLive(
        name === 'phone' ? value : updatedForm.phone,
        name === 'countryCode' ? value : updatedForm.countryCode
      ),
    }))
  }
}

 

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitted(true)

  setTouched({
    email: true,
    phone: true,
    organisationId: true,
  })

  const validationErrors = validateForm(form)

  // Check if any required field is empty
  const hasEmptyRequiredFields =
    !form.email || !form.phone || !form.organisationId

  if (hasEmptyRequiredFields) {
    setFormError('All mandatory fields must be filled')
    return
  }

  // Check for format errors
  if (Object.values(validationErrors).some(v => v)) {
    setFormError('Please fix the highlighted fields')
    return
  }

  setFormError('')
  router.push('/')
}

  const getBorderClass = (field: keyof Errors, value: string) => {
    // If the form has been submitted or the field has been touched, AND there's an error OR it's empty,
    // then apply the error border. Otherwise, apply the valid border.
    if ((isSubmitted || touched[field]) && (errors[field] || value === '')) {
      return 'border-red-500'
    }
    // If the field is valid and not empty, apply the normal blue border
    if (value !== '' && !errors[field]) {
      return 'border-[#00AFEF]'
    }
    // Default border for untouched fields that are not yet submitted or empty
    return 'border-gray-300'; // Or whatever your default neutral border color is
  }

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-4 pt-20">
      {/* TOP LOGO BAR */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-white z-50 px-6 pt-4 border-b border-[#e5e7eb]">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Bonhomiee" className="h-[32px] w-auto" />
          <h1 className="text-lg font-bold text-[#00AFEF]">Bonhomiee</h1>
        </div>
      </div>

      <div className="bg-white rounded-[4px] border border-[#f1f1f1] grid grid-cols-2 max-w-4xl w-full h-[85vh]">
        {/* LEFT IMAGE */}
        <div className="hidden md:block relative">
          <Image
            src={corporatePic}
            alt="Corporate Signup"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/10"></div>
        </div>

        {/* RIGHT FORM */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col h-full">
          <h2 className="text-base font-semibold text-center text-[#00AFEF] mb-3">
            Corporate Signup
          </h2>

          {formError && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3 text-xs">
              {formError}
            </div>
          )}
          <div className="mx-12 mb-5 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>   
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {/* EMAIL */}
            <div>
              <label className={`${labelClass} flex items-center gap-1`}>
                Email <span className="text-red-500">*</span>
                <TooltipIcon
                  id="tooltip-email"
                  content="Enter a valid email like name@company.com"
                />
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${inputClass} ${getBorderClass('email', form.email)}`}
                placeholder="name@company.com"
              />
              <ErrorMessage message={errors.email} />
              
            </div>

            {/* PHONE */}
            <div>
              <label className={`${labelClass} flex items-center gap-1`}>
                Mobile Number <span className="text-red-500">*</span>
                <TooltipIcon
                  id="tooltip-phone"
                  content="Enter a valid mobile number with country code"
                />
              </label>
             <div
                  className={`flex h-[38px] rounded border ${getBorderClass(
                    'phone',
                    form.phone
                  )}`}
                >
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className="px-3 text-[12px] border-r border-[#9ec5e5]"                >
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
                  placeholder="Enter mobile number"
                  maxLength={10}
                  className="flex-1 px-3 text-[12px] outline-none"
                />
              </div>
              <ErrorMessage message={errors.phone} />
            </div>

            {/* ORG ID */}
            <div>
              <label className={`${labelClass} flex items-center gap-1`}>
                Organisation ID <span className="text-red-500">*</span>
                <TooltipIcon
                  id="tooltip-org"
                  content="Enter your registered organisation ID"
                />
              </label>
              <input
                name="organisationId"
                value={form.organisationId}
                onChange={handleChange}
                className={`${inputClass} ${getBorderClass(
                  'organisationId',
                  form.organisationId
                )}`}
                placeholder="Enter organisation ID"
              />
              <ErrorMessage message={errors.organisationId} />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className={`${footerButtonClass} bg-[#E62800]`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${footerButtonClass} bg-[#00AFEF]`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
