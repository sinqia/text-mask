const dollarSign = '$'
const emptyString = ''
const comma = ','
const period = '.'
const minus = '-'
const minusRegExp = /-/g
// const nonDigitsRegExp = /\D+/g
// const number = 'number'
const digitRegExp = /\d/
// const caretTrap = '[]'

export default function createNoDecimalNumberPipe({
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
    const {rawValue, previousConformedValue} = config

    // Calculate lengths once for performance
    const rawValueLength = (rawValue || '').length
    const previousConformedValueLength = (previousConformedValue || '').length

    // This tells us the number of edited characters and the direction in which they were edited (+/-)
    const editDistance = rawValueLength - previousConformedValueLength

    // In *no guide* mode, we need to know if the user is trying to add a character or not
    const isAddition = editDistance > 0

    const value = rawValue

    // No Number Character
    if ((value.match(new RegExp(`[^0-9${thousandsSeparatorSymbol}${minus}]`, 'g')) || []).length > 0) {
      return false
    }

    const negative = (value.match(minusRegExp) || []).length % 2 === 1
    const negativeConformedValue = ((conformedValue || '').match(minusRegExp) || []).length % 2 === 1
    const negativePrevious = ((previousConformedValue || '').match(minusRegExp) || []).length % 2 === 1

    // integer limit
    if (integerLimit !== null && numberOfDigits(value) > integerLimit) {
      return false
    }

    // add '.'
    if (numberOfdecimalSymbol(value) > 0) {
      return false
    }

    //add '0' on left
    if (isAddition &&
      (previousConformedValue || '') !== emptyString &&
      (negative ? value[1] === '0' : value[0] === '0') &&
      (negativePrevious ? previousConformedValue[1] !== '0' : previousConformedValue[0] !== '0')
    ) {
      return false
    }

    // case '00'
    if (negativeConformedValue ?
      value[1] === '0' && (numberOfDigits(conformedValue[2]) > 0 ||
        (conformedValue[2] || '') === thousandsSeparatorSymbol) :
      value[0] === '0' && (numberOfDigits(conformedValue[1]) > 0 ||
        (conformedValue[1] || '') === thousandsSeparatorSymbol)
    ) {
      return false
    }

    // add ','
    if (isAddition &&
      numberOfThousandsSeparatorSymbol(value) > numberOfThousandsSeparatorSymbol(previousConformedValue) &&
      numberOfDigits(value) === numberOfDigits(previousConformedValue)) {
      return false
    }
    return conformedValue
  }

  function numberOfdecimalSymbol(str) {
    if (decimalSymbol === undefined ||
      decimalSymbol === null || decimalSymbol.trim() === '') {
      return 0
    }
    const re = new RegExp(decimalSymbol.replace(/\./g, '\\.'), 'g')
    return ((str || '').match(re) || []).length
  }

  function numberOfThousandsSeparatorSymbol(str) {
    if (thousandsSeparatorSymbol === undefined ||
      thousandsSeparatorSymbol === null || thousandsSeparatorSymbol.trim() === '') {
      return 0
    }
    const re = new RegExp(thousandsSeparatorSymbol.replace(/\./g, '\\.'), 'g')
    return ((str || '').match(re) || []).length
  }

  function numberOfDigits(str) {
    const digitReg = new RegExp(digitRegExp, 'g')
    return ((str || '').match(digitReg) || []).length
  }

  numberPipe.instanceOf = 'createFixedDecimalScaleNumberPipe'

  return numberPipe
}
