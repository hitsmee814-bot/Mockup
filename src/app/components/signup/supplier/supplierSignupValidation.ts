import { parsePhoneNumberFromString } from "libphonenumber-js"

export const validateUsername = (value: string) => {
  if (!value) return ""

  const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9._]{5,15}$/

  if (!USERNAME_REGEX.test(value)) {
    return "Username must start with a letter and contain 6–16 characters. Only letters, numbers, periods and underscores are allowed."
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


const TAX_FORMATS: Record<
  string,
  { regex: RegExp; error: string }
> = {
  GST: {
    regex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    error: "Please enter valid GST number",
  },
  PAN: {
     regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    error: "Please enter valid PAN number",
  },
  VAT: {
    regex: /^[A-Z0-9]{8,12}$/,
    error: "Please enter valid VAT number",
  },
}

export const validateTaxId = (
  value: string,
  docType: string
): TaxValidationResult => {
  if (!docType || !value) {
    return { isValid: true, error: "" }
  }

  const rule = TAX_FORMATS[docType]
  if (!rule) {
    return { isValid: true, error: "" }
  }

  if (!rule.regex.test(value.toUpperCase())) {
    return { isValid: false, error: rule.error }
  }

  return { isValid: true, error: "" }
}