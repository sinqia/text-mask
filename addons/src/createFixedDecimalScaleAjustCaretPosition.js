import {
  adjustCaretPosition as adjustCaretPositionDefault
} from '@sinqia/text-mask-core'

import {
  default as createNoDecimalNumberScaleAjustCaretPosition
} from './createNoDecimalNumberScaleAjustCaretPosition'

const defaultArray = []
const emptyString = ''
const dollarSign = '$'
const comma = ','
const period = '.'
// const minus = '-'
const minusRegExp = /-/g
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
    caretTrapIndexes = defaultArray
  }) {
    if (allowDecimal === false || decimalLimit === 0) {
      return createNoDecimalNumberScaleAjustCaretPosition({
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
      })({
        previousConformedValue,
        previousPlaceholder,
        conformedValue,
        placeholder,
        rawValue,
        currentCaretPosition,
        placeholderChar,
        indexesOfPipedChars,
        caretTrapIndexes
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

    // Store lengths for faster performance?
    const rawValueLength = rawValue.length
    const previousConformedValueLength = previousConformedValue.length

    // This tells us how long the edit is. If user modified input from `(2__)` to `(243__)`,
    // we know the user in this instance pasted two characters
    const editLength = rawValueLength - previousConformedValueLength

    // If the edit length is positive, that means the user is adding characters, not deleting.
    const isAddition = editLength > 0

    // add '0' in decimal
    if (isAddition && editLength === 1 &&
      previousConformedValue === conformedValue &&
      conformedValue.indexOf(decimalSymbol) + 1 < currentCaretPosition &&
      rawValue[currentCaretPosition - 1] === '0' &&
      conformedValue[conformedValue.length - 1] === '0'
    ) {
      return currentCaretPosition
    }

    if (allowNegative) {
      const negative = ((rawValue || '').match(minusRegExp) || []).length % 2 === 1
      const previousNegative = ((previousConformedValue || '').match(minusRegExp) || []).length % 2 === 1
      // add '-'
      if (isAddition && editLength === 1 && negative !== previousNegative) {
        if (negative) {
          return currentCaretPosition
        } else {
          currentCaretPosition = currentCaretPosition - 2
          return currentCaretPosition < 0 ? 0 : currentCaretPosition
        }
      }
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
      caretTrapIndexes
    })
  }

  adjustCaretPosition.instanceOf = 'createFixedDecimalScaleAjustsCaretPosition'

  return adjustCaretPosition
}
