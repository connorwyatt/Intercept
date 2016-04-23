import { Component, Input, forwardRef, Provider } from 'angular2/core';
import { NG_VALUE_ACCESSOR } from 'angular2/common';
import { InInput } from '../InInput.component';
import { IInSelectOption } from '../../../interfaces/IInSelectOption';

declare const __moduleName: string;

const IN_INPUT_SELECT_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InInputSelect),
    multi: true
  }
);

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=select][ngControl]',
  templateUrl: 'InInputSelect.html',
  providers: [IN_INPUT_SELECT_CONTROL_VALUE_ACCESSOR]
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
}
