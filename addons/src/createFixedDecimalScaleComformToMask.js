import {
  conformToMask as conformToMask
} from '@snsl/text-mask-core'
import {
  placeholderChar as defaultPlaceholderChar
} from '@snsl/text-mask-core'
import {
  createNoDecimalNumberComformToMask
} from './createNoDecimalNumberComformToMask'

const dollarSign = '$'
const emptyString = ''
const comma = ','
const period = '.'
const minus = '-'
const minusRegExp = /-/g
//const nonDigitsRegExp = /\D+/g
// const number = 'number'
const digitRegExp = /\d/g
// const caretTrap = '[]'

export default function createFixedDecimalScaleComformToMask({
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
  function numberComformToMask(rawValue = emptyString, mask = emptyString, config = {}) {
    if (allowDecimal === false || decimalLimit === 0) {
      return createNoDecimalNumberComformToMask({
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
      })(rawValue, mask, config)
    }
    let value = rawValue

    const {
      placeholderChar = defaultPlaceholderChar,
      previousConformedValue
    } = config

    const previousConformedValueLength = (previousConformedValue || '').length
    const rawValueLength = (rawValue || '').length
    const editDistance = rawValueLength - previousConformedValueLength
    const isAddition = editDistance > 0
    const negative = (value.match(minusRegExp) || []).length > 0

    if (isAddition) {
      // start with '.'
      if ((value || '').length > 0) {
        if (negative) {
          if (value[0] === minus && value[1] === decimalSymbol) {
            value = `${minus}0${decimalSymbol}${value.substr(2)}`
          }
        } else if (value[0] === decimalSymbol) {
          value = `0${value}`
        }
      }

      // removing 0 on left
      if (numberOfDigits(value) > 0) {
        //error: number start with 0
        if (negative) {
          while ((value || '').length > 4 && value[0] === minus && value[1] === '0' && value[2] !== ',') {
            value = `${minus}${value.substr(2)}`
          }
        } else {
          while ((value || '').length > 3 && value[0] === '0' && value[1] !== ',') {
            value = value.substr(1)
          }
        }
      }
    }

    let {
      conformedValue,
      meta
    } = conformToMask(value, mask, config)

    const valueIndexOfDecimalSymbol = (value || '').indexOf(decimalSymbol)
    const indexOfDecimalSymbol = (conformedValue || '').indexOf(decimalSymbol)
    const previousIndexOfDecimalSymbol = (previousConformedValue || '').indexOf(decimalSymbol)

    if (isAddition) {
      // when start with ( 0 || -0 ) and caret position is on the left, when press any value remove '0'
      if (!negative &&
        numberOfDigits(conformedValue.substr(0, indexOfDecimalSymbol)) === 2 &&
        (previousConformedValue || '').substr(0, previousIndexOfDecimalSymbol) === '0') {
        conformedValue = `${conformedValue.substr(0, 1)}${conformedValue.substr(2)}`
      } else if (negative &&
        numberOfDigits(conformedValue.substr(0, indexOfDecimalSymbol)) === 2 &&
        (previousConformedValue || '').substr(0, previousIndexOfDecimalSymbol) === '-0') {
        conformedValue = `${conformedValue.substr(0, 2)}${conformedValue.substr(3)}`
      }

      if ((previousConformedValue || '') === emptyString && conformedValue !== emptyString) {
        // start with empty string
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') !== emptyString && value[0] === minus) {
        // select all the input and start a new value || (tab)
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }
    } else {
      if ((previousConformedValue || '') !== emptyString) {
        if (value === decimalSymbol) { // select all the input and press '.'
          conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0

          // removing number after '.' ( 0.0 | -0.0 -> .0 | -.0 )
        } else if (value[0] === decimalSymbol || value.substr(0, 2) === `${minus}${decimalSymbol}`) {
          // excluding all when all decimals is 0
          if (value.substr(valueIndexOfDecimalSymbol + 1).match(new RegExp('0', 'g')).length === decimalLimit) {
            conformedValue = ''
          } else if (!negative) { // keep 0
            conformedValue = `0${value}`
          } else { // keep 0
            conformedValue = `-0${value.substr(1)}`
          }
        } else if ((value || '').length > 0) { // select all the input and start new value
          conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
        }
      }

      // removing '.'
      if ((previousConformedValue || '') !== emptyString &&
        numberOfDigits(value.substr(valueIndexOfDecimalSymbol + 1)) < decimalLimit &&
        (value || '').length > 0) {
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }
    }

    return {
      conformedValue, meta
    }
  }

  function numberOfDigits(str) {
    return ((str || '').match(digitRegExp) || []).length
  }

  numberComformToMask.instanceOf = 'createFixedDecimalScaleComformToMask'

  return numberComformToMask
}
