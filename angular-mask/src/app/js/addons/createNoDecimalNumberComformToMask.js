import {conformToMask as conformToMask} from '../core/text-mask-core'

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

export function createNoDecimalNumberComformToMask({
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
      //erro numero começando com 0
      while ((value || '').length >= 2 && value[0] === '0') {
        value = value.substr(1)
      }
    }

    let {
      conformedValue,
      meta
    } = conformToMask(value, mask, config)

    return {conformedValue, meta}
  }

  numberComformToMask.instanceOf = 'createFixedDecimalScaleComformToMask'

  return numberComformToMask
}
