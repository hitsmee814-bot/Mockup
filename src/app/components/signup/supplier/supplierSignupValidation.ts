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