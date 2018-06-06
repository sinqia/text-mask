import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createNumberMask } from './js/addons/createNumberMask';
import { createFixedDecimalScaleNumberPipe } from './js/addons/createFixedDecimalScaleNumberPipe';
import { createFixedDecimalScaleComformToMask } from './js/addons/createFixedDecimalScaleComformToMask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public myModel: string;
  public modelWithValue: string;
  public formControlInput: FormControl = new FormControl();
  public mask: Array<string | RegExp>;

  constructor() {
    this.mask = AppComponent.createTaxaPuMask();
    this.myModel = '';
    this.modelWithValue = '1.2345,12123';
    this.formControlInput.setValue('1.2345,12123');
  }

  static createTaxaPuMask(): any {
    const properties = {
        prefix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        decimalSymbol: ',',
        decimalLimit: 7,
        integerLimit: 8,
        requireDecimal: true,
        fixedDecimalScale: true
    };
    return {
        mask: createNumberMask(properties),
        pipe: createFixedDecimalScaleNumberPipe(properties),
        conformToMask: createFixedDecimalScaleComformToMask(properties)
    };
}
}
