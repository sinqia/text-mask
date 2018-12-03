const createNoDecimalNumberPipe = (isVerify()) ?
  require('../dist/textMaskAddons.js').createNoDecimalNumberPipe :
  require('../src/createNoDecimalNumberPipe.js').default

describe('createNoDecimalNumberPipe', () => {
  it('Number Character validation', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('', {rawValue: 'a', previousConformedValue: ''})).to.equal(false)
  })

  it('- Character', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('-', {rawValue: '-', previousConformedValue: ''})).to.equal('-')
    expect(numberPipe('-3', {rawValue: '-3', previousConformedValue: '-0'})).to.equal('-3')
  })

  it('Many - Character validation', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('', {rawValue: '--', previousConformedValue: ''})).to.equal(false)
  })

  it('Negative Number with minus Not in 0 Position', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('111-11', {rawValue: '111-11', previousConformedValue: ''})).to.equal(false)
  })

  it('integer limit', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('111111', {rawValue: '111111', previousConformedValue: ''})).to.equal(false)
  })

  it('add "0" on left', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('01111', {rawValue: '01111', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('01111', {rawValue: '01111', previousConformedValue: '1111'})).to.equal(false)
  })

  it('add "."', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('111.111', {rawValue: '111.111', previousConformedValue: ''})).to.equal(false)
    expect(numberPipe('111.111', {rawValue: '111.111', previousConformedValue: '11111'})).to.equal(false)
    expect(numberPipe('111.111', {rawValue: '111.111', previousConformedValue: '111111'})).to.equal(false)
  })

  it('add ","', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('11,111', {rawValue: '11,111', previousConformedValue: ''})).to.equal('11,111')
    expect(numberPipe('11,111', {rawValue: '11,111', previousConformedValue: '11111'})).to.equal(false)
    expect(numberPipe('11,111', {rawValue: '11,111', previousConformedValue: '11111'})).to.equal(false)
    expect(numberPipe('11,11,1', {rawValue: '11,11,1', previousConformedValue: '11,111'})).to.equal(false)
    expect(numberPipe('11111', {rawValue: '11111', previousConformedValue: '11,111'})).to.equal('11111')
  })

  it('passing on pipe', () => {
    let numberPipe = createNoDecimalNumberPipe({integerLimit: 5})

    expect(numberPipe('12,132', {rawValue: '12,132', previousConformedValue: ''})).to.equal('12,132')
    expect(numberPipe('', {rawValue: '', previousConformedValue: '11111'})).to.equal('')
    expect(numberPipe('4111', {rawValue: '4111', previousConformedValue: '111'})).to.equal('4111')
    expect(numberPipe('11', {rawValue: '11', previousConformedValue: '121'})).to.equal('11')
    expect(numberPipe('1554', {rawValue: '1554', previousConformedValue: '1234'})).to.equal('1554')
  })
})

