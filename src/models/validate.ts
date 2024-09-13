export const phoneValidateData: {
  placeholder?: string
  helper?: undefined
  validationMessage?: string
} = {
  placeholder: '0912345678',
  helper: undefined,
  validationMessage: '手機格式錯誤 ex:0912345678'
}
export function validatePhoneNumber(isValidateValue: boolean, validateValue: string) {
  const phoneRegex = /^09\d{8}$/ // 以 09 開頭，後面 8 個數字的正則表達式
  isValidateValue = phoneRegex.test(validateValue)
  return (isValidateValue = phoneRegex.test(validateValue))
}
