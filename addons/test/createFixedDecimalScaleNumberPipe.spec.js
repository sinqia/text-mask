require('babel-core/register')({plugins: ['babel-plugin-rewire']})

const createFixedDecimalScaleNumberPipe = (isVerify()) ?
  require('../dist/textMaskAddons.js').createFixedDecimalScaleNumberPipe :
  require('../src/createFixedDecimalScaleNumberPipe.js').default

describe('createFixedDecimalScaleNumberPipe', () => {
  it('number without Decimals', () => {
    if(!isVerify()) {
      const createNoDecimalNumberPipeSky = sinon.spy(() => () => '12345')

      let numberPipe = createFixedDecimalScaleNumberPipe({decimalLimit: 0})

      createFixedDecimalScaleNumberPipe.__Rewire__('createNoDecimalNumberPipe', createNoDecimalNumberPipeSky)

      expect(numberPipe('1', {rawValue: '1', previousConformedValue: ''})).to.equal('12345')
      expect(createNoDecimalNumberPipeSky.callCount).to.equal(1)

      createFixedDecimalScaleNumberPipe.__ResetDependency__('createNoDecimalNumberPipe')
    }
  })

  it('Number Character validation', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 8})

    expect(numberPipe('', {rawValue: 'a', previousConformedValue: ''})).to.equal(false)
  })

  it('- Character', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 8})

    expect(numberPipe('-', {rawValue: '-', previousConformedValue: ''})).to.equal('-')
    expect(numberPipe('-3.0', {rawValue: '-3.0', previousConformedValue: '-0.0'})).to.equal('-3.0')
    expect(numberPipe('-3.0', {rawValue: '-3.0', previousConformedValue: '-12354.0'})).to.equal('-3.0')
  })

  // it('Many - Character validation', () => {
  //   let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 8})

  //   expect(numberPipe('', {rawValue: '--', previousConformedValue: ''})).to.equal(false)
  //   expect(numberPipe('--13546', {rawValue: '--13546', previousConformedValue: '-13546'})).to.equal(false)
  //   expect(numberPipe('--', {rawValue: '--', previousConformedValue: '-13546'})).to.equal(false)
  // })

  // it('Negative Number with minus Not in 0 Position', () => {
  //   let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 8})

  //   expect(numberPipe('111-11', {rawValue: '111-11', previousConformedValue: '11111'})).to.equal(false)
  //   expect(numberPipe('11111-', {rawValue: '11111-', previousConformedValue: '11111'})).to.equal(false)
  //   expect(numberPipe('111-11', {rawValue: '111-11', previousConformedValue: ''})).to.equal(false)
  // })

  it('integer limit', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 8})
    expect(numberPipe('111111', {rawValue: '111111', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('111111.0', {rawValue: '111111.0', previousConformedValue: '11111.0'})).to.equal(false)

    numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, decimalLimit: 8})
    expect(numberPipe('111111', {rawValue: '111111', previousConformedValue: ''})).to.equal('111111')
    expect(numberPipe('111111.0', {rawValue: '111111.0', previousConformedValue: '11111.0'})).to.equal('111111.0')
  })

  it('deleting "."', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 8})
    expect(numberPipe('1122', {rawValue: '1122', previousConformedValue: '1.122'})).to.equal(false)
    expect(numberPipe('11111', {rawValue: '11111', previousConformedValue: '11.111'})).to.equal(false)
  })

  it('decimal limit', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 2})
    expect(numberPipe('1.122', {rawValue: '1.122', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('11.111', {rawValue: '11.111', previousConformedValue: '11.11'})).to.equal(false)
    // conformMask Will Exclude 0 on the right
    expect(numberPipe('11.10', {rawValue: '11.100', previousConformedValue: '11.00'})).to.equal('11.10')
    expect(numberPipe('11.11', {rawValue: '11.1100', previousConformedValue: '11.00'})).to.equal('11.11')
  })

  it('add "0" on left', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 2})
    expect(numberPipe('00.0', {rawValue: '00.0', previousConformedValue: '0.0'})).to.equal(false)
    expect(numberPipe('01.0', {rawValue: '01.0', previousConformedValue: '1.0'})).to.equal(false)
    expect(numberPipe('-00.0', {rawValue: '-00.0', previousConformedValue: '-0.0'})).to.equal(false)
    expect(numberPipe('-01.0', {rawValue: '-01.0', previousConformedValue: '-1.0'})).to.equal(false)
    // conformMask Will Exclude 0 on the right
    expect(numberPipe('11.10', {rawValue: '11.100', previousConformedValue: '11.00'})).to.equal('11.10')
    expect(numberPipe('11.11', {rawValue: '11.1100', previousConformedValue: '11.00'})).to.equal('11.11')
    expect(numberPipe('-11.10', {rawValue: '-11.100', previousConformedValue: '-11.00'})).to.equal('-11.10')
    expect(numberPipe('-11.11', {rawValue: '-11.1100', previousConformedValue: '-11.00'})).to.equal('-11.11')
  })

  it('case "00"', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 2})
    expect(numberPipe('00.0', {rawValue: '00.0', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('01.0', {rawValue: '01.0', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('-00.0', {rawValue: '-00.0', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('-01.0', {rawValue: '-01.0', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('00.0', {rawValue: '00.0', previousConformedValue: '1000.0'})).to.equal(false)
    expect(numberPipe('01.0', {rawValue: '01.0', previousConformedValue: '1000.0'})).to.equal(false)
    expect(numberPipe('-00.0', {rawValue: '-00.0', previousConformedValue: '1000.0'})).to.equal(false)
    expect(numberPipe('-01.0', {rawValue: '-01.0', previousConformedValue: '1000.0'})).to.equal(false)
  })

  it('add ","', () => {
    let numberPipe = createFixedDecimalScaleNumberPipe({allowDecimal: true, integerLimit: 5, decimalLimit: 2})
    expect(numberPipe('1,000.0,', {rawValue: '1,000.0,', previousConformedValue: '1,000.0'})).to.equal(false)
    expect(numberPipe('1,0,00.0', {rawValue: '1,0,00.0', previousConformedValue: '1,000.0'})).to.equal(false)
  })
})

