'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

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
  country: string
  taxId: string
  website: string
  complianceFile: File | null
}

const SERVICE_TYPES = ['Hotel', 'Flight', 'Transport', 'Tour', 'Visa', 'Cruise']

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'India',
  'Canada',
  'Australia',
  'Germany',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STRONG_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg']
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

export default function SupplierSignup() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [error, setError] = useState('')
  const [serviceOpen, setServiceOpen] = useState(false)
  const serviceRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

const COUNTRY_CODES = [
  { code: '+1', label: 'US' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'IN' },
  { code: '+61', label: 'AU' },

]


  const [form, setForm] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    username: '',
    password: '',
    confirmPassword: '',
    supplierLegalName: '',
    tradeName: '',
    serviceTypes: [],
    country: '',
    taxId: '',
    website: '',
    complianceFile: null,
  })

  /* CLOSE SERVICE DROPDOWN */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* INPUT HANDLER */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /* PASSWORD BLUR VALIDATION */
  const handlePasswordBlur = () => {
    if (!form.password) return

    if (!STRONG_PASSWORD.test(form.password)) {
      setError('Not a strong password')
    } else {
      setError((prev) =>
        prev === 'Not a strong password' ? '' : prev
      )
    }
  }

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null
  if (!file) return

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    setError('Only JPG or PDF files are allowed')
    return
  }

  if (file.size > MAX_FILE_SIZE) {
    setError('File size must be less than 15 MB')
    return
  }

  setError('')
  setForm((prev) => ({ ...prev, complianceFile: file }))
}


  /* STEP 1 VALIDATION */
  const validateStep1 = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      return 'All mandatory fields must be filled'
    }

    if (!EMAIL_REGEX.test(form.email)) {
      return 'Invalid email format'
    }

    if (!STRONG_PASSWORD.test(form.password)) {
      return 'Not a strong password'
    }

    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match'
    }

    return ''
  }

  /* STEP 2 VALIDATION */
  const validateStep2 = () => {
    if (
      !form.supplierLegalName ||
      !form.tradeName ||
      form.serviceTypes.length === 0 ||
      !form.country ||
      !form.taxId ||
      !form.website||
    !form.complianceFile
      
    ) {
      return 'All mandatory fields must be filled'
    }
    return ''
  }

  const goToStep2 = () => {
    const err = validateStep1()
    if (err) {
      setError(err)
      return
    }
    setError('')
    setStep(2)
  }

  const goBackToStep1 = () => {
    setForm((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }))
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateStep2()
    if (err) {
      setError(err)
      return
    }
    setError('')
    router.push('/')
  }

  return (
   <main className="relative min-h-screen bg-gray-100 px-4">
    {/* LOGO */}
<div className="absolute top-6 left-6">
  <img
    src="/images/final logo Bonhomiee in yellow without.png"
    alt="Company Logo"
    className="h-10 w-auto"
  />
</div>
      <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg grid grid-cols-2 overflow:hidden">

        {/* LEFT IMAGE */}
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: "url('/images/supplier.jpg')" }}
        />

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <h2 className="text-xl font-semibold">
            Supplier Registration – Step {step}
          </h2>

          {error && (
            <div
              role="alert"
              style={{ color: '#b91c1c' }}
              className="bg-red-100 border border-red-400 px-4 py-2 rounded-md text-xs font-medium"
            >
              {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Input label="First Name *" name="firstName" value={form.firstName} onChange={handleChange} />
              <Input label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} />
              <Input label="Last Name *" name="lastName" value={form.lastName} onChange={handleChange} />
              <Input
  label="Email *"
  name="email"
  value={form.email}
  onChange={handleChange}
  tooltip="Enter a valid email address (example: name@company.com)"
/>

             <div className="flex flex-col">
  <label className="font-medium text-xs mb-0.5">
    Phone <span className="text-red-500">*</span>
  </label>

  <div className="flex items-center border rounded bg-white h-[34px]">
    {/* Country + Code */}
    <select
      name="countryCode"
      value={form.countryCode}
      onChange={handleChange}
      className="h-full px-2 text-xs bg-transparent outline-none border-r w-[170px]"
    >
      {COUNTRY_CODES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.label} {c.code}
        </option>
      ))}
    </select>

    {/* Phone Number */}
    <input
      type="tel"
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="Phone number"
      className="flex-1 px-2 text-xs outline-none"
    />
  </div>
</div>

              <Input label="Username *" name="username" value={form.username} onChange={handleChange} />
             <Input
  type="password"
  label="Password *"
  name="password"
  value={form.password}
  onChange={handleChange}
  onBlur={handlePasswordBlur}
  tooltip="Min 8 char, at least one uppercase letter, one lowercase letter, one number, and one special char."
/>

              <Input
                type="password"
                label="Retype Password *"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              <div className="flex justify-center gap-4 pt-6">
                <button type="button" onClick={() => router.push('/')} className="px-8 py-2 bg-gray-300 rounded-full">
                  Cancel
                </button>
                <button type="button" onClick={goToStep2} className="px-8 py-2 bg-gray-300 rounded-full">
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Input label="Legal Business Name *" name="supplierLegalName" value={form.supplierLegalName} onChange={handleChange} />
              <Input label="Trade Name *" name="tradeName" value={form.tradeName} onChange={handleChange} />

          <div className="flex flex-col">
  <label className="font-medium text-xs mb-1 flex items-center">
    Service Types <span className="text-red-500 ml-1">*</span>
    <span
      title="Hold Ctrl (Windows) or Cmd (Mac) to select multiple"
      className="ml-2 text-blue-600 text-xs cursor-help"
    >
      ⓘ
    </span>
  </label>

  <select
    multiple
    name="serviceTypes"
    value={form.serviceTypes}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        serviceTypes: Array.from(
          e.target.selectedOptions,
          (option) => option.value
        ),
      }))
    }
    className="border rounded px-2 py-1.5 text-xs leading-tight h-28"
  >
    {SERVICE_TYPES.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>


<div className="flex flex-col">
  <label className="font-medium text-xs mb-1 flex items-center">
    Country <span className="text-red-500 ml-1">*</span>
  </label>

  <select
    name="country"
    value={form.country}
    onChange={handleChange}
    className="border rounded px-2 py-1.5 text-xs"
  >
    <option value="">Select country *</option>
    {COUNTRIES.map((c) => (
      <option key={c} value={c}>
        {c}
      </option>
    ))}
  </select>
</div>


              <Input label="Tax ID *" name="taxId" value={form.taxId} onChange={handleChange} />
              <Input label="Website *" name="website" value={form.website} onChange={handleChange} />

<div className="flex flex-col">
  <label className="font-medium text-xs mb-1 flex items-center">
    Compliance Certificate <span className="text-red-500 ml-1">*</span>
    <span
      title="Upload JPG or PDF file. Maximum size: 15 MB."
      className="ml-2 text-blue-600 text-xs cursor-help"
    >
      ⓘ
    </span>
  </label>

  <div className="flex items-center gap-2 border rounded px-2 py-1.5 text-xs bg-white">
    <button
      type="button"
      style={{
  background: 'linear-gradient(180deg, #60a5fa, #3b82f6)', // light → primary blue
  color: '#ffffff',
  padding: '4px 12px',
  borderRadius: '6px',
  border: '1px solid #2563eb',
  boxShadow: '0 2px 0 #1d4ed8',
  cursor: 'pointer',
}}


      onClick={() => fileInputRef.current?.click()}
     /* className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"*/
    >
      Choose File
    </button>

    <input
      ref={fileInputRef}
      type="file"
      accept=".pdf,.jpg,.jpeg"
      onChange={handleFileChange}
      className="hidden"
    />
  </div>

  {form.complianceFile && (
    <p className="mt-1 text-xs text-gray-600">
      Selected file: {form.complianceFile.name}
    </p>
  )}
</div>



              <div className="flex gap-4 pt-6">
                <button type="button" onClick={goBackToStep1} className="flex-1 bg-gray-300 px-8 py-2 rounded-full text-center">
                  Back
                </button>
                <button type="submit" className="flex-1 bg-gray-300 px-8 py-2 rounded-full text-center">
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      </div>
    </main>
  )
}

/* INPUT COMPONENT */
function Input({
  label,
  tooltip,
  ...props
}: {
  label: string
  tooltip?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const isRequired = label.includes('*')

  return (
    <div className="flex flex-col">
      <label className="font-medium text-xs mb-1 flex items-center">
        {label.replace('*', '')}
        {isRequired && <span className="text-red-500 ml-1">*</span>}

        {tooltip && (
          <span
            title={tooltip}
            className="ml-2 text-blue-600 text-xs cursor-help"
          >
            ⓘ
          </span>
        )}
      </label>

      <input {...props} className="border rounded px-2 py-1.5" />
    </div>
  )
}

