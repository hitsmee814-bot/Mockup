'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { AlertCircle } from 'lucide-react'
import logo from "../../assets/images/logoPrimary.png"
import corporatePic from "../../assets/images/traveling-concept-with-landmarks.jpg"

/* ================= CONSTANTS ================= */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const labelClass = 'text-[12px] font-medium text-[#1A1A1A]'
const inputClass =
  'h-[38px] w-full rounded border border-[#00AFEF] bg-white px-3 text-[12px] text-black placeholder:text-gray-400 focus:outline-none'
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
    countryCode: '+1',
    phone: '',
    organisationId: '',
  })

  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [error, setError] = useState('')

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    if (name === 'email') validateEmailLive(value)
    if (name === 'phone' || name === 'countryCode')
      validatePhoneLive(
        name === 'phone' ? value : form.phone,
        name === 'countryCode' ? value : form.countryCode
      )
  }

  /* ================= VALIDATION ================= */
  const validateEmailLive = (value: string) => {
    if (!value) return setEmailError('')
    if (!EMAIL_REGEX.test(value))
      return setEmailError('Please enter a valid email address')

    const domain = value.split('@')[1]
    if (domain !== domain.toLowerCase())
      return setEmailError('Email domain must be lowercase')

    setEmailError('')
  }

  const validatePhoneLive = (phone: string, code: string) => {
    if (!phone) return setPhoneError('')

    const parsed = parsePhoneNumberFromString(`${code}${phone}`)
    if (!parsed || !parsed.isValid())
      setPhoneError('Please enter a valid phone number')
    else setPhoneError('')
  }

  const validateForm = () => {
    if (!form.email || !form.phone || !form.organisationId)
      return 'All mandatory fields must be filled'
    if (emailError || phoneError)
      return 'Please fix validation errors'
    return ''
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateForm()
    if (err) return setError(err)
    setError('')
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-4 pt-20">

      {/* TOP LOGO BAR */}
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

        {/* LEFT IMAGE */}
        <div className="hidden md:block relative">
          <Image src={corporatePic} alt="Corporate Signup" fill className="object-cover" />
          <div className="absolute inset-0 bg-blue-900/10"></div>
        </div>

        {/* RIGHT FORM */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col h-full">

          {/* HEADER */}
          <div>
            <h2 className="text-base font-semibold text-center text-[#00AFEF] mb-1">
              Corporate Signup
            </h2>

            {/* LIGHT BLUE DIVIDER */}
            <div className="mx-12 mb-5 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            {error && (
              <div className="bg-red-100 border  text-red-700 px-3 py-2 rounded mb-3 text-xs">
                {error}
              </div>
            )}
          </div>

          {/* BODY */}
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
                placeholder="name@company.com"
                className={inputClass}
              />
              <ErrorMessage message={emailError} />
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
              <div className="flex h-[38px] border border-[#00AFEF] rounded">
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className="px-3 text-[12px] border-r border-[#9ec5e5]"
                >
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
                  className="flex-1 px-3 text-[12px] outline-none"
                  inputMode="numeric"
                />
              </div>
              <ErrorMessage message={phoneError} />
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
                placeholder="Enter organisation ID"
                className={inputClass}
              />
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