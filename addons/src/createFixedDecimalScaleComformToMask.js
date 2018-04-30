import {conformToMask as conformToMask} from '@snsl/text-mask-core'
import {placeholderChar as defaultPlaceholderChar} from '@snsl/text-mask-core'

const dollarSign = '$'
const emptyString = ''
const comma = ','
const period = '.'
// const minus = '-'
// const minusRegExp = /-/
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
    let value = rawValue
    if ((value.match(digitRegExp) || []).length > 0) { // case '_' or ' ' or ''
      if ((value !== emptyString && value[0] === decimalSymbol &&
        (value.match(new RegExp('0', 'g')) || []).length === decimalLimit
      )) { // case ',00000000' (clear all))
        value = ''
      } else {
        //erro numero começando com virgula
        if ((value || '').length > 0 && value[0] === decimalSymbol) {
          value = '0' + value
        }
        //erro numero começando com 0 começando com virgula
        if ((value || '').length > 2 && (value[0] === '0' ||
          (thousandsSeparatorSymbol === emptyString || value[0] === thousandsSeparatorSymbol))) {
          for (let i = 0; i < value.length;) {
            if ((value[i] === '0' ||
              (thousandsSeparatorSymbol === emptyString || value[i] === thousandsSeparatorSymbol)) &&
              value[i + 1] !== decimalSymbol) {
              value = value.substr(1)
            } else {
              break
            }
          }
        }
      }
    }

    const {
      placeholderChar = defaultPlaceholderChar,
      previousConformedValue
    } = config

    let {
      conformedValue,
      meta
    } = conformToMask(value, mask, config)

    if ((conformedValue.match(digitRegExp) || []).length > 0 || // case '_' or ' ' or ''
      ((previousConformedValue || '') === emptyString && conformedValue !== emptyString &&
        conformedValue[1] === decimalSymbol &&
        (conformedValue.match(new RegExp(placeholderChar, 'g')) || []).length === (decimalLimit + 1)
      )) { // case '_.________' (Start By '.')
      // change placeholder char by 0
      conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0')
    }

    return {conformedValue, meta}
  }

  numberComformToMask.instanceOf = 'createFixedDecimalScaleComformToMask'

  return numberComformToMask
}
