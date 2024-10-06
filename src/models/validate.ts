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
export function validatePhoneNumber(
  isValidateValue: boolean,
  validateValue: string,
  dataEmpty?: boolean
) {
  dataEmpty == undefined ? false : true
  if (dataEmpty && (validateValue == undefined || validateValue === '')) return true
  const regex = /^09\d{8}$/ // 以 09 開頭，後面 8 個數字的正則表達式
  isValidateValue = regex.test(validateValue)

  return (isValidateValue = regex.test(validateValue))
}

//桌號驗證
export const tableValidateData: {
  placeholder?: string
  helper?: string
  validationMessage?: string
} = {
  placeholder: '請填寫桌號',
  helper: undefined,
  validationMessage: '桌號格式錯誤，請輸入數字，ex:1'
}
export function validateTable(
  isValidateValue: boolean,
  validateValue: string,
  dataEmpty?: boolean
) {
  dataEmpty == undefined ? false : true
  if (dataEmpty && (validateValue == undefined || validateValue === '')) return true
  const regex = /^\d+$/
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

//帳號驗證
export const accountValidateData: {
  placeholder?: string
  helper?: string
  validationMessage?: string
} = {
  placeholder: '請輸入帳號',
  helper: '英文字母、數字、長度 6-12',
  validationMessage: '帳號格式錯誤，英文字母、數字、長度6-12'
}
export function validateAccount(isValidateValue: boolean, validateValue: string) {
  const regex = /^[a-zA-Z0-9]{6,12}$/
  isValidateValue = regex.test(validateValue)
  return (isValidateValue = regex.test(validateValue))
}

//密碼驗證
export const passwordValidateData: {
  placeholder?: string
  helper?: string
  validationMessage?: string
} = {
  placeholder: '請輸入密碼',
  helper: '，英文字母、數字、長度6-12',
  validationMessage: '密碼格式錯誤，英文字母、數字、長度6-12'
}
export function validatePassword(isValidateValue: boolean, validateValue: string) {
  const regex = /^[a-zA-Z0-9]{6,12}$/
  isValidateValue = regex.test(validateValue)
  return (isValidateValue = regex.test(validateValue))
}
