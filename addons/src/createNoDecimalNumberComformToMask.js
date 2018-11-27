import {
  conformToMask
} from '@snsl/text-mask-core'
import {
  placeholderChar as defaultPlaceholderChar
} from '@snsl/text-mask-core'

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
    let value = rawValue
    const negative = (value.match(minusRegExp) || []).length > 0
    // tirando 0 as esquerda
    if ((value.match(digitRegExp) || []).length > 0) {
      //erro numero começando com 0
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

    const {
      placeholderChar = defaultPlaceholderChar,
      previousConformedValue,
    } = config

    const previousConformedValueLength = (previousConformedValue || '').length
    const rawValueLength = (rawValue || '').length
    const editDistance = rawValueLength - previousConformedValueLength
    const isAddition = editDistance > 0

    let {
      conformedValue,
      meta
    } = conformToMask(value, mask, config)

    if (isAddition) {
      // 0 || -0 digita numero ficando 10 || -10 (remove o 0)
      if (!negative && (conformedValue.match(digitRegExp) || []).length === 2 &&
        (previousConformedValue || '') === '0') {
        conformedValue = conformedValue.substr(0, 1)
      } else if (negative && (conformedValue.match(digitRegExp) || []).length === 2 &&
        (previousConformedValue || '') === '-0') {
        conformedValue = conformedValue.substr(0, 2)
      }

      if ((conformedValue.match(digitRegExp) || []).length > 0) { // case '_' or ' ' or ''
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') === emptyString && conformedValue !== emptyString) {
        // começando a digitar a partir de string vazia
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') !== emptyString && value[0] === minus) {
        // Selecionando tudo e digitando novo valor (tab)
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }
    } else {
      if ((previousConformedValue || '') !== emptyString && value[0] === minus &&
        previousConformedValueLength !== 2) { // previne -0 e aperta o backspace
        // Selecionando tudo e digitando novo valor (tab)
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') !== emptyString && // está excluindo
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
