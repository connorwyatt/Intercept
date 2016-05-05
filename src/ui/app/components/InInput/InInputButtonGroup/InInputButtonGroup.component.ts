import { Component, Input, ViewEncapsulation, Self } from '@angular/core';
import { NgControl } from '@angular/common';
import { InInput } from '../InInput.component';
import { IInSelectOption } from '../../../interfaces/IInSelectOption';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=button-group]',
  templateUrl: 'InInputButtonGroup.html',
  styleUrls: [
    '../../../styles/core.css',
    'InInputButtonGroup.css'
  ],
  encapsulation: ViewEncapsulation.Native
})
export class InInputButtonGroup extends InInput {
  @Input()
  private options: Array<IInSelectOption>;

  private get value(): string {
    return this.modelValue;
  }

  private set value(newValue: string) {
    if (newValue !== this.modelValue) {
      this.modelValue = newValue;

      this.onChange(newValue);
    }
  }

  constructor(@Self() control: NgControl) {
    super(control);
  }

}
