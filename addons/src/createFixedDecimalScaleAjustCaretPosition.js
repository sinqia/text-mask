import {
  adjustCaretPosition as adjustCaretPositionDefault
} from '@snsl/text-mask-core'

const defaultArray = []
const emptyString = ''
const dollarSign = '$'
const comma = ','
const period = '.'
// const minus = '-'
// const minusRegExp = /-/
// const nonDigitsRegExp = /\D+/g
// const number = 'number'
// const digitRegExp = /\d/
// const caretTrap = '[]'

export default function createFixedDecimalScaleAjustCaretPosition({
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
  function adjustCaretPosition({
    previousConformedValue = emptyString,
    previousPlaceholder = emptyString,
    currentCaretPosition = 0,
    conformedValue,
    rawValue,
    placeholderChar,
    placeholder,
    indexesOfPipedChars = defaultArray,
    caretTrapIndexes = defaultArray,
    hasRejectedChar = null,
    pipeRejected = false
  }) {
    if (allowDecimal === false || decimalLimit === 0) {
      return adjustCaretPositionDefault({
        previousConformedValue,
        previousPlaceholder,
        conformedValue,
        placeholder,
        rawValue,
        currentCaretPosition,
        placeholderChar,
        indexesOfPipedChars,
        caretTrapIndexes,
        hasRejectedChar,
        pipeRejected
      })
    }

    // initializating with '.'
    if (rawValue === decimalSymbol) {
      return conformedValue.indexOf(decimalSymbol) + 1
    }

    // press '.'
    if (((rawValue || '').match(new RegExp(decimalSymbol.replace(/\./g, '\\.'), 'g')) || []).length === 2) {
      return conformedValue.indexOf(decimalSymbol) + 1
    }

    return adjustCaretPositionDefault({
      previousConformedValue,
      previousPlaceholder,
      conformedValue,
      placeholder,
      rawValue,
      currentCaretPosition,
      placeholderChar,
      indexesOfPipedChars,
      caretTrapIndexes,
      hasRejectedChar,
      pipeRejected
    })
  }

  adjustCaretPosition.instanceOf = 'createFixedDecimalScaleAjustsCaretPosition'

  return adjustCaretPosition
}
