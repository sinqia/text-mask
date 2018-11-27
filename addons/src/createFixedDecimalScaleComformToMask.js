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
      // erro numero começando com virgula
      if ((value || '').length > 0) {
        if (negative) {
          if (value[0] === minus && value[1] === decimalSymbol) {
            value = `${minus}0${decimalSymbol}${value.substr(2)}`
          }
        } else if (value[0] === decimalSymbol) {
          value = `0${value}`
        }
      }

      // tirando 0 as esquerda
      if (numberOfDigits(value) > 0) {
        //erro numero começando com 0
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
      // 0 || -0 digita numero ficando 10 || -10 (remove o 0)
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
        // começando a digitar a partir de string vazia
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }

      if ((previousConformedValue || '') !== emptyString && value[0] === minus) {
        // Selecionando tudo e digitando novo valor (tab)
        conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
      }
    } else {
      if ((previousConformedValue || '') !== emptyString) {
        if (value === decimalSymbol) { // selecionando tudo e digita '.'
          conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0

          // está excluindo // ',' ou '-,'
        } else if (value[0] === decimalSymbol || value.substr(0, 2) === `${minus}${decimalSymbol}`) {
          // apaga somente quando as casas decimais eh 0
          if (value.substr(valueIndexOfDecimalSymbol + 1).match(new RegExp('0', 'g')).length === decimalLimit) {
            conformedValue = ''
          } else if (!negative) { // recoloca o 0
            conformedValue = `0${value}`
          } else {
            conformedValue = `-0${value.substr(1)}`
          }
        } else if ((value || '').length > 0) { // selecionando tudo e digitando do 0
          conformedValue = conformedValue.replace(new RegExp(placeholderChar, 'g'), '0') // change placeholder char by 0
        }
      }

      // excluindo decimal
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
