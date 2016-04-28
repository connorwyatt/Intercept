import { Component, Input, ViewEncapsulation, Self } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { InInput } from '../InInput.component';
import { InMessages } from '../../InMessages/InMessages.component';
import { InValidationErrorsPipe } from '../../../pipes/InValidationErrors.pipe';
import { IInSelectOption } from '../../../interfaces/IInSelectOption';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=select][ngControl]',
  templateUrl: 'InInputSelect.html',
  styleUrls: [
    '../../../styles/core.css',
    '../InInput.css',
    'InInputSelect.css'
  ],
  directives: [[InMessages]],
  pipes: [InValidationErrorsPipe],
  encapsulation: ViewEncapsulation.Native
})
export class InInputSelect extends InInput {
  @Input()
  private field: string;

  @Input()
  private label: string;

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
