const dollarSign = '$'
const emptyString = ''
const comma = ','
const period = '.'
// const minus = '-'
// const minusRegExp = /-/
// const nonDigitsRegExp = /\D+/g
// const number = 'number'
// const digitRegExp = /\d/
// const caretTrap = '[]'

export default function createFixedDecimalScaleNumberPipe({
  prefix = dollarSign,
  suffix = emptyString,
  includeThousandsSeparator = true,
  thousandsSeparatorSymbol = comma,
  allowDecimal = false,
  decimalSymbol = period,
  decimalLimit = 2,
  requireDecimal = false,
  allowNegative = false,
  allowLeadingZeroes = false,
  fixedDecimalScale = false,
  integerLimit = null
} = {}) {
  function numberPipe(conformedValue, config) {
    const {rawValue, previousConformedValue, placeholderChar} = config

    // Calculate lengths once for performance
    const rawValueLength = (rawValue || '').length
    const previousConformedValueLength = (previousConformedValue || '').length

    // This tells us the number of edited characters and the direction in which they were edited (+/-)
    const editDistance = rawValueLength - previousConformedValueLength

    // In *no guide* mode, we need to know if the user is trying to add a character or not
    const isAddition = editDistance > 0

    const value = rawValue

    const decimalSymbolCount = numberOfdecimalSymbol(value)
    if (decimalSymbolCount > 1 || // many '.'
      (decimalSymbolCount === 0 && (rawValue || '') !== emptyString &&
        (previousConformedValue || '') !== emptyString) || //deleting '.'
      (value[0] === '0' && value[1] !== decimalSymbol && isAddition &&
      (previousConformedValue || '') !== emptyString && previousConformedValue[0] !== '0') || //add '0' on left
      (rawValue.match(new RegExp(placeholderChar)) || []).length > 0) { // add '_'
      return false
    }
    return conformedValue
  }

  function numberOfdecimalSymbol(str) {
    const re = new RegExp(decimalSymbol, 'g')
    return (str.match(re) || []).length
  }

  numberPipe.instanceOf = 'createFixedDecimalScaleNumberPipe'

  return numberPipe
}
