import { MaskedInputDirective } from '../src/angular2/angular2TextMask'

describe('MaskedInputDirective', () => {
  it('should create an instance', () => {
    const directive = new MaskedInputDirective(null, null, false)
    expect(directive).toBeTruthy()
  })
})
