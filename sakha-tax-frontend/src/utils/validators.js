// Indian mobile numbers: 10 digits, starting 6-9, optional +91/91 prefix.
export const INDIAN_MOBILE_REGEX = /^(?:(?:\+91|91)[-\s]?)?[6-9]\d{9}$/

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidIndianMobile = (value) => INDIAN_MOBILE_REGEX.test((value || '').trim())

export const isValidEmail = (value) => EMAIL_REGEX.test((value || '').trim())
