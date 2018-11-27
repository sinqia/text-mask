const createNumberMask = (isVerify()) ?
  require('../dist/createNumberMask.js').default :
  require('../src/createNumberMask.js').default

describe('createNumberMask', () => {
  it('can returns a configured currency mask', () => {
    let numberMask = createNumberMask()

    expect(numberMask).to.be.a('function')
  })

  it('takes a prefix', () => {
    let numberMask = createNumberMask({prefix: '$'})
    const maskResult = numberMask('12')
    expect(maskResult.mask).to.deep.equal(['$', /\d/, /\d/])
    expect(maskResult.hasRejectedChar).to.equal(false)
  })

  it('takes a suffix', () => {
    let numberMask = createNumberMask({suffix: ' $', prefix: ''})
    const maskResult = numberMask('12')
    expect(maskResult.mask).to.deep.equal([/\d/, /\d/, ' ', '$'])
    expect(maskResult.hasRejectedChar).to.equal(false)
  })

  it('works when the prefix contains numbers', () => {
    let numberMask = createNumberMask({prefix: 'm2 '})
    const maskResult = numberMask('m2 1')
    expect(maskResult.mask).to.deep.equal(['m', '2', ' ', /\d/])
    expect(maskResult.hasRejectedChar).to.equal(false)
  })

  it('works when the suffix contains numbers', () => {
    let numberMask = createNumberMask({prefix: '', suffix: ' m2'})
    const maskResult = numberMask('1 m2')
    expect(maskResult.mask).to.deep.equal([/\d/, ' ', 'm', '2'])
    expect(maskResult.hasRejectedChar).to.equal(false)
  })

  it('works when there is a decimal and the suffix contains numbers', () => {
    let numberMask = createNumberMask({prefix: '', suffix: ' m2', allowDecimal: true})
    const maskResult = numberMask('1.2 m2')
    expect(maskResult.mask).to.deep.equal([/\d/, '[]', '.', '[]', /\d/, ' ', 'm', '2'])
    expect(maskResult.hasRejectedChar).to.equal(false)
  })

  it('can be configured to add a thousands separator or not', () => {
    let numberMaskWithoutThousandsSeparator = createNumberMask({includeThousandsSeparator: false})
    const numberMaskWithoutThousandsSeparatorResult = numberMaskWithoutThousandsSeparator('1000')
    expect(numberMaskWithoutThousandsSeparatorResult.mask).to.deep.equal(['$', /\d/, /\d/, /\d/, /\d/])
    expect(numberMaskWithoutThousandsSeparatorResult.hasRejectedChar).to.equal(false)

    let numberMaskWithThousandsSeparator = createNumberMask()
    const numberMaskWithThousandsSeparatorResult = numberMaskWithThousandsSeparator('1000')
    expect(numberMaskWithThousandsSeparatorResult.mask).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
    expect(numberMaskWithThousandsSeparatorResult.hasRejectedChar).to.equal(false)
  })

  it('can be configured with a custom character for the thousands separator', () => {
    let numberMask = createNumberMask({thousandsSeparatorSymbol: '.'})
    const numberMaskResult = numberMask('1000')
    expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, '.', /\d/, /\d/, /\d/])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('can be configured to accept a fraction and returns the fraction separator with caret traps', () => {
    let numberMask = createNumberMask({allowDecimal: true})
    const numberMaskResult = numberMask('1000.')
    expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/, '[]', '.', '[]'])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('rejects fractions by default', () => {
    let numberMask = createNumberMask()
    const numberMaskResult = numberMask('1000.')
    expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
    expect(numberMaskResult.hasRejectedChar).to.equal(true)
  })

  it('can be configured with a custom character for the fraction separator', () => {
    let numberMask = createNumberMask({
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '.'
    })
    const numberMaskResult = numberMask('1000,')
    expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, '.', /\d/, /\d/, /\d/, '[]', ',', '[]'])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('can limit the length of the fraction', () => {
    let numberMask = createNumberMask({allowDecimal: true, decimalLimit: 2})
    const numberMaskResult = numberMask('1000.3823')
    expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/, '[]', '.', '[]', /\d/, /\d/])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('can require a fraction', () => {
    let numberMask = createNumberMask({requireDecimal: true})
    const numberMaskResult = numberMask('1000')
    expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/, '[]', '.', '[]'])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('accepts negative integers', function() {
    let numberMask = createNumberMask({allowNegative: true})
    const numberMaskResult = numberMask('-$12')
    expect(numberMaskResult.mask).to.deep.equal([/-/, '$', /\d/, /\d/])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('ignores multiple minus signs', function() {
    let numberMask = createNumberMask({allowNegative: true})
    const numberMaskResult = numberMask('--$12')
    expect(numberMaskResult.mask).to.deep.equal([/-/, '$', /\d/, /\d/])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('adds a digit placeholder if the input is nothing but a minus sign in order to attract the caret', () => {
    let numberMask = createNumberMask({allowNegative: true})
    const numberMaskResult = numberMask('-')
    expect(numberMaskResult.mask).to.deep.equal([/-/, '$', /\d/])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('starts with dot should be considered as decimal input', () => {
    let numberMask = createNumberMask({prefix: '$', allowDecimal: true})
    let numberMaskResult = numberMask('.')
    expect(numberMaskResult).to.deep.equal(['$', '0', '.', /\d/])

    numberMask = createNumberMask({prefix: '#', allowDecimal: true})
    numberMaskResult = numberMask('.')
    expect(numberMaskResult).to.deep.equal(['#', '0', '.', /\d/])

    numberMask = createNumberMask({prefix: '', allowDecimal: true})
    numberMaskResult = numberMask('.')
    expect(numberMaskResult).to.deep.equal(['0', '.', /\d/])

    numberMask = createNumberMask({allowDecimal: false})
    numberMaskResult = numberMask('.')
    expect(numberMaskResult.mask).to.deep.equal(['$'])
    expect(numberMaskResult.hasRejectedChar).to.equal(true)

    numberMask = createNumberMask({prefix: '', suffix: '$', allowDecimal: true})
    numberMaskResult = numberMask('.')
    expect(numberMaskResult).to.deep.equal(['0', '.', /\d/, '$'])
  })

  it('can allow leading zeroes', function() {
    let numberMask = createNumberMask({allowLeadingZeroes: true})
    const numberMaskResult = numberMask('012')
    expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, /\d/, /\d/])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  it('works with large numbers when leading zeroes is false', function() {
    let numberMask = createNumberMask({allowLeadingZeroes: false})
    const numberMaskResult = numberMask('111111111111111111111111')
    expect(numberMaskResult.mask).to.deep.equal([
      '$', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',',
      /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/
    ])
    expect(numberMaskResult.hasRejectedChar).to.equal(false)
  })

  describe('integer limiting', () => {
    it('can limit the length of the integer part', () => {
      let numberMask = createNumberMask({integerLimit: 3})
      const numberMaskResult = numberMask('1999')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('works when there is a prefix', () => {
      let numberMask = createNumberMask({integerLimit: 3, prefix: '$'})
      const numberMaskResult = numberMask('$1999')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('works when there is a thousands separator', () => {
      let numberMask = createNumberMask({integerLimit: 4, prefix: ''})
      let numberMaskResult = numberMask('1,9995')
      expect(numberMaskResult.mask).to.deep.equal([/\d/, ',', /\d/, /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)

      numberMask = createNumberMask({integerLimit: 7, prefix: ''})
      numberMaskResult = numberMask('1,000,0001')
      expect(numberMaskResult.mask).to.deep.equal([/\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('works when there is a decimal and a prefix', () => {
      let numberMask = createNumberMask({integerLimit: 3, allowDecimal: true})
      const numberMaskResult = numberMask('$199.34')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, /\d/, /\d/, '[]', '.', '[]', /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('works when there is a decimal and no prefix', () => {
      let numberMask = createNumberMask({integerLimit: 3, allowDecimal: true, prefix: ''})
      const numberMaskResult = numberMask('199.34')
      expect(numberMaskResult.mask).to.deep.equal([/\d/, /\d/, /\d/, '[]', '.', '[]', /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('works when thousandsSeparatorSymbol is a period', () => {
      let numberMask = createNumberMask({
        prefix: '',
        thousandsSeparatorSymbol: '.',
        decimalSymbol: ',',
        allowDecimal: true,
        requireDecimal: true,
        integerLimit: 5,
        decimalLimit: 3,
      })
      const numberMaskResult = numberMask('1234567890,12345678')
      expect(numberMaskResult.mask).to.deep.equal([
        /\d/, /\d/, '.', /\d/, /\d/, /\d/, '[]', ',', '[]', /\d/, /\d/, /\d/
      ])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })
  })

  describe('numberMask default behavior', () => {
    let numberMask = null

    beforeEach(() => {
      numberMask = createNumberMask()
    })

    it('returns a mask that has the same number of digits as the given number', () => {
      const numberMaskResult = numberMask('20382')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, /\d/, ',', /\d/, /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('uses the dollar symbol as the default prefix', () => {
      const numberMaskResult = numberMask('1')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('adds no suffix by default', () => {
      const numberMaskResult = numberMask('1')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('returns a mask that appends the currency symbol', () => {
      const numberMaskResult = numberMask('1')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('adds adds a comma after a thousand', () => {
      const numberMaskResult = numberMask('1000')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('adds as many commas as needed', () => {
      const numberMaskResult = numberMask('23984209342084')
      expect(numberMaskResult.mask).to.deep.equal([
        '$', /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/
      ])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('accepts any string and strips out any non-digit characters', () => {
      const numberMaskResult = numberMask('h4x0r sp43k')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(true)
    })

    it('does not allow leading zeroes', function() {
      let numberMask = createNumberMask()
      const numberMaskResult = numberMask('012')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })

    it('allows one leading zero followed by a fraction', function() {
      let numberMask = createNumberMask({allowDecimal: true})
      const numberMaskResult = numberMask('0.12')
      expect(numberMaskResult.mask).to.deep.equal(['$', /\d/, '[]', '.', '[]', /\d/, /\d/])
      expect(numberMaskResult.hasRejectedChar).to.equal(false)
    })
  })
})
