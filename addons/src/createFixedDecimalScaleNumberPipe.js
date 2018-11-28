import {
  default as createNoDecimalNumberPipe
} from './createNoDecimalNumberPipe'

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
    if (allowDecimal === false || decimalLimit === 0) {
      return createNoDecimalNumberPipe({
        prefix: prefix,
        suffix: suffix,
        includeThousandsSeparator: includeThousandsSeparator,
        thousandsSeparatorSymbol: thousandsSeparatorSymbol,
        allowDecimal: allowDecimal,
        decimalSymbol: decimalSymbol,
        decimalLimit: decimalLimit,
        requireDecimal: requireDecimal,
        allowNegative: allowNegative,
        allowLeadingZeroes: allowLeadingZeroes,
        fixedDecimalScale: fixedDecimalScale,
        integerLimit: integerLimit
      })(conformedValue, config)
    }

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
    if ((value.match(new RegExp(`[^0-9${thousandsSeparatorSymbol}${decimalSymbol}${minus}]`, 'g')) || []).length > 0) {
      return false
    }

    // Only 1 Minus
    if ((value.match(minusRegExp) || []).length > 1) {
      return false
    }

    // many '.'
    const decimalSymbolCount = numberOfdecimalSymbol(value)
    if (decimalSymbolCount > 1) {
      return false
    }

    // Negative Number with minus Not in 0 Position
    const negative = ((value || '').match(minusRegExp) || []).length > 0
    const previousNegative = ((previousConformedValue || '').match(minusRegExp) || []).length > 0
    if (negative && value[0] !== minus) {
      return false
    }

    // interger limit
    if (integerLimit !== null && numberOfDigits(value.substr(0, value.indexOf(decimalSymbol))) > integerLimit) {
      return false
    }
    // decimal limit
    if (numberOfDigits(value.substr(value.indexOf(decimalSymbol) + 1)) > decimalLimit &&
      value.substr(value.length - 1) !== '0') { // posso por um a mais desde que seja para excluir o 0
      return false
    }

    //deleting '.'
    if (decimalSymbolCount === 0 &&
      (value || '') !== emptyString &&
      (previousConformedValue || '') !== emptyString &&
      numberOfDigits(value) === numberOfDigits(previousConformedValue)) {
      return false
    }

    //add '0' on left
    if (isAddition &&
      (previousConformedValue || '') !== emptyString &&
      (negative ? value[1] === '0' : value[0] === '0') &&
      (previousNegative ? previousConformedValue[1] !== '0' : previousConformedValue[0] !== '0')
    ) {
      return false
    }

    // case '00'
    if (isAddition &&
      (negative ? value[1] === '0' && value[2] === '0' : value[0] === '0' && value[1] === '0')) {
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
    if (decimalSymbol === undefined || decimalSymbol === null || decimalSymbol.trim() === '') {
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
