import {Component, AfterViewInit, ElementRef, ViewChild, AfterViewChecked} from '@angular/core'
import {FormControl} from '@angular/forms'
import { 
  createNumberMask as createNumberMask,
  createFixedDecimalScaleNumberPipe as createFixedDecimalScaleNumberPipe,
  createFixedDecimalScaleComformToMask as createFixedDecimalScaleComformToMask,
  createFixedDecimalScaleAjustCaretPosition as createFixedDecimalScaleAjustCaretPosition,
} from '@snsl/text-mask-addons'

@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
export default class AppComponent implements AfterViewInit {

  public myModel: string
  public modelWithValue: string
  public formControlInput: FormControl = new FormControl()
  public mask: Array<string | RegExp>
  public modelWithValue2: string
  public modelWithValue3: string
  public modelWithValue4: string
  @ViewChild('maskedDecimal3') input:ElementRef;


  private properties = {
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    decimalLimit: 0,
    integerLimit: 5,
    requireDecimal: true,
    fixedDecimalScale: true,
    allowDecimal: true,
    allowNegative: true
  }

  private properties2 = {
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    decimalLimit: 8,
    integerLimit: 5,
    requireDecimal: true,
    fixedDecimalScale: true,
    allowDecimal: true,
    allowNegative: true
  }

  private properties3 = {
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    decimalLimit: 8,
    integerLimit: 5,
    requireDecimal: true,
    fixedDecimalScale: true,
    allowDecimal: true,
    allowNegative: false
  }

  public customMask = {
    mask: createNumberMask(this.properties),
    pipe: createFixedDecimalScaleNumberPipe(this.properties),
    conformToMask: createFixedDecimalScaleComformToMask(this.properties),
    adjustCaretPosition: createFixedDecimalScaleAjustCaretPosition(this.properties)
  }

  public customMask2 = {
    mask: createNumberMask(this.properties2),
    pipe: createFixedDecimalScaleNumberPipe(this.properties2),
    conformToMask: createFixedDecimalScaleComformToMask(this.properties2),
    adjustCaretPosition: createFixedDecimalScaleAjustCaretPosition(this.properties2)
  }

  public customMask3 = {
    mask: createNumberMask(this.properties3),
    pipe: createFixedDecimalScaleNumberPipe(this.properties3),
    conformToMask: createFixedDecimalScaleComformToMask(this.properties3),
    adjustCaretPosition: createFixedDecimalScaleAjustCaretPosition(this.properties3)
  }

  constructor() {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.myModel = ''
    this.modelWithValue = '5554441234'
    this.modelWithValue2 = '0'
    this.modelWithValue3 = '0'
    this.modelWithValue4 = '0'
    this.formControlInput.setValue('5555551234')
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.addEventListener("blur", () => this.onchange());
  }

  onchange() {
    console.log('aisim')
  }
}
