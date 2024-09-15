//手機驗證
export const phoneValidateData: {
  placeholder?: string
  helper?: string
  validationMessage?: string
} = {
  placeholder: '0912345678',
  helper: undefined,
  validationMessage: '手機格式錯誤 ex:0912345678'
}
export function validatePhoneNumber(isValidateValue: boolean, validateValue: string) {
  const regex = /^09\d{8}$/ // 以 09 開頭，後面 8 個數字的正則表達式
  isValidateValue = regex.test(validateValue)
  return (isValidateValue = regex.test(validateValue))
}

//載具驗證
export const receiptValidateData: {
  placeholder?: string
  helper?: string
  validationMessage?: string
} = {
  placeholder: '/ABC1234',
  helper: undefined,
  validationMessage: '載具格式錯誤，開頭需"/"且英文必須大寫 ex:/ABC1234'
}
export function validateReceipt(isValidateValue: boolean, validateValue: string) {
  const regex = /^\/[A-Z]{3}[0-9]{4}$/
  isValidateValue = regex.test(validateValue)
  return (isValidateValue = regex.test(validateValue))
}

//統編驗證
export const taxIdValidateData: {
  placeholder?: string
  helper?: string
  validationMessage?: string
} = {
  placeholder: '12345678',
  helper: undefined,
  validationMessage: '統編格式錯誤，需8位數字 ex:12345678'
}
export function validateTaxId(isValidateValue: boolean, validateValue: string) {
  const regex = /^[0-9]{8}$/
  isValidateValue = regex.test(validateValue)
  return (isValidateValue = regex.test(validateValue))
}
