import {
  conformToMask as conformToMask
} from '@sinqia/text-mask-core'
import {
  placeholderChar as defaultPlaceholderChar
} from '@sinqia/text-mask-core'

const dollarSign = '$'
const emptyString = ''
const comma = ','
const period = '.'
const minus = '-'
const minusRegExp = /-/
//const nonDigitsRegExp = /\D+/g
// const number = 'number'
const digitRegExp = /\d/g
// const caretTrap = '[]'

export default function createNoDecimalNumberComformToMask({
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
    const {
      placeholderChar = defaultPlaceholderChar,
      previousConformedValue,
    } = config

    const previousConformedValueLength = (previousConformedValue || '').length
    const rawValueLength = (rawValue || '').length
    const editDistance = rawValueLength - previousConformedValueLength
    const isAddition = editDistance > 0
    let value = rawValue
    const negative = (value.match(new RegExp(minusRegExp, 'g')) || []).length % 2 === 1

    // removing 0 on left
    if ((value.match(digitRegExp) || []).length > 0) {
      //error: number start with 0
      if (negative) {
        while ((value || '').length >= 3 && value[0] === minus && value[1] === '0') {
          value = `${minus}${value.substr(2)}`
        }
      } else {
        while ((value || '').length >= 2 && value[0] === '0') {
          value = value.substr(1)
        }
      }
    }

    // add '-' in anywhere
    value = value.replace(new RegExp(minusRegExp, 'g'), '')
    if(negative) {
      value = `${minus}${value}`
    }

    let {
      conformedValue,
      meta
    } = conformToMask(value, mask, config)

    if (isAddition) {
      const digitMatch = (conformedValue.match(digitRegExp) || [])
      // when start with ( 0 || -0 ) and caret position is on the left, when press any value remove '0'
      if (!negative && digitMatch.length === 2 &&
        (previousConformedValue || '') === '0' &&
        digitMatch[1] === '0') {
        conformedValue = conformedValue.substr(0, 1)
      } else if (negative && digitMatch.length === 2 &&
        (previousConformedValue || '') === '-0' &&
        digitMatch[1] === '0') {
        conformedValue = conformedValue.substr(0, 2)
      }

      if ((conformedValue.match(digitRegExp) || []).length > 0) { // case '_' or ' ' or ''
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') === emptyString && conformedValue !== emptyString) {
        // starting with empty string
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') !== emptyString && value[0] === minus) {
        // select all the input and start a new value || (tab)
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }
    } else {
      if ((previousConformedValue || '') !== emptyString && value[0] === minus &&
        previousConformedValueLength !== 2) { // error: -0 and press backspace
        // select all the input and start a new value || (tab)
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') !== emptyString && // excluding all
        (conformedValue === placeholderChar || conformedValue === `${minus}${placeholderChar}`) // '_' ou '-_'
      ) {
        conformedValue = ''
      }
    }

    return {
      conformedValue, meta
    }
  }

  numberComformToMask.instanceOf = 'createFixedDecimalScaleComformToMask'

  return numberComformToMask
}
