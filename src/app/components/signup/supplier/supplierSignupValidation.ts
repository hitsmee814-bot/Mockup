import { parsePhoneNumberFromString } from "libphonenumber-js"

/* ================= PASSWORD VALIDATION ================= */

import { passwordStrength } from "check-password-strength"

/* Strong password rule */
 
 export const STRONG_PASSWORD =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

/* Check if password contains personal names */
export const containsPersonalName = (
  password: string,
  firstName: string,
  middleName: string,
  lastName: string
): boolean => {
  const pwd = password.toLowerCase()

  return [firstName, middleName, lastName]
    .filter(Boolean)
    .some(name => pwd.includes(name.toLowerCase()))
}

/* Validate password */
export const validatePassword = (
  password: string,
  firstName: string,
  middleName: string,
  lastName: string
) => {
  if (!password) {
    return {
      error: "",
      strength: null,
    }
  }

  /* Rule 1 — Strong password */
  if (!STRONG_PASSWORD.test(password)) {
    return {
      error:
        "The password does not yet meet the required criteria.",
      strength: null,
    }
  }

  /* Rule 2 — No personal names */
  if (
    containsPersonalName(
      password,
      firstName,
      middleName,
      lastName
    )
  ) {
    return {
      error:
        "Password should not contain your first, middle, or last name.",
      strength: null,
    }
  }

  /* Rule 3 — Strength calculation */
  const strength = passwordStrength(password)

  return {
    error: "",
    strength,
  }
}

/* Confirm password validation */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (!password && !confirmPassword) return ""

  if (!confirmPassword) return ""

  if (password !== confirmPassword) {
    return "Passwords do not match"
  }

  return ""
}

export  const WEBSITE_REGEX =
/^(https?:\/\/)?(?:(?:www\.)|(?!w+\.))([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/

export const validateWebsiteLive = (value: string) => {
  // Empty → no error yet
  if (!value) {
    return ''
  }

  if (!WEBSITE_REGEX.test(value)) {
    return 'Please enter a valid website URL'
  } else {
    return ''
  }
}

export const validateUsername = (value: string) => {
  if (!value) return ""

  const USERNAME_REGEX =/^(?=.{4,20}$)[a-zA-Z][a-zA-Z0-9_]*$/
  if (!USERNAME_REGEX.test(value)) {
    return "Username must start with a letter and be 4–20 characters using letters, numbers, or _."
  }

  return ""
}



export const validatePhone = (
  phone: string,
  countryCode: string
): string => {

  // Empty → no error
  if (!phone) return ""

  const digitsOnly = phone.replace(/\D/g, "")

  // start validation
  if (digitsOnly.length < 10) {
    return "Please enter a valid phone number"
  }

  const fullNumber = `${countryCode}${digitsOnly}`
  const phoneNumber = parsePhoneNumberFromString(fullNumber)

  if (!phoneNumber || !phoneNumber.isValid()) {
    return "Please enter a valid phone number"
  }

  return ""
}



export const validateEmail = (value: string) => {
  if (!value) return ""

 const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

  if (!EMAIL_REGEX.test(value)) {
    return "Please enter a valid email address."
  }
  const domain = value.split('@')[1]
  if (domain && domain !== domain.toLowerCase()) {
    return('Email domain must be lowercase')
    
  }

  return ""
}


type TaxValidationResult = {
  isValid: boolean
  error: string
}


//Later VAT regex will be changed asccording to country of registration
const VAT_REGEX_BY_COUNTRY = {
  UK: /^GB\d{9}(\d{3})?$/,
  DE: /^DE\d{9}$/,
  FR: /^FR[A-HJ-NP-Z0-9]{2}\d{9}$/,
}
//---------------Later--------------- 

const IDENTIFIER_VALIDATIONS: Record<
  string,
  { regex: RegExp; error: string }
> = {

  GSTIN: {
    regex:
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    error: "Please enter valid GSTIN number",
  },

  PAN: {
    regex:
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    error: "Please enter valid PAN number",
  },

  CIN: {
    regex:
      /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
    error: "Please enter valid CIN number",
  },

  UDYAM_NO: {
    regex:
      /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/,
    error: "Please enter valid UDYAM number",
  },

}

export const validateIdentifier = (
  value: string,
  identifier?: string
) => {

  if (!identifier || !value) {
    return { isValid: true, error: "" }
  }

  // Ignore placeholder
  if (identifier === "document identifier") {
    return { isValid: true, error: "" }
  }

  const rule =
    IDENTIFIER_VALIDATIONS[identifier]

  // If no rule exists → allow
  if (!rule) {
    return { isValid: true, error: "" }
  }

  if (!rule.regex.test(value.toUpperCase())) {
    return {
      isValid: false,
      error: rule.error,
    }
  }

  return {
    isValid: true,
    error: "",
  }
}

/* ================= STEP VALIDATIONS ================= */

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
  tradeLicenseNumber: string
  compRegistrationNumber: string
}

/* Utility */
const hasEmptyFields = (
  fields: (string | any[] | undefined | null)[]
) => {
  return fields.some(field => {
    if (typeof field === "string")
      return !field.trim()

    if (Array.isArray(field))
      return field.length === 0

    return !field
  })
}

/* STEP 1 */
export const validateStep1 = (
  form: FormData,
  errors: {
    emailError: string
    phoneError: string
    usernameError: string
    passwordError: string
    confirmPasswordError: string
  }
): "EMPTY" | "INVALID" | "OK" => {

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

  if (
    errors.emailError ||
    errors.phoneError ||
    errors.usernameError ||
    errors.passwordError ||
    errors.confirmPasswordError
  ) {
    return "INVALID"
  }

  if (form.password !== form.confirmPassword) {
    return "INVALID"
  }

  return "OK"
}

/* STEP 2 */
export const validateStep2 = (
  form: FormData,
  websiteError: string
): "EMPTY" | "INVALID" | "OK" => {

  if (
    hasEmptyFields([
      form.supplierLegalName,
      form.tradeName,      
      form.countryOfRegistration,
      form.websiteUrl,
    ])
  ) {
    return "EMPTY"
  }

  if (!form.serviceTypes || form.serviceTypes.length === 0) {
  return "EMPTY"
}

  if (websiteError) {
    return "INVALID"
  }

  return "OK"
}


