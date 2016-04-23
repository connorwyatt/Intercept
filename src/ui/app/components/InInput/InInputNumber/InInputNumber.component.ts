import { Component, Input, forwardRef, Provider } from 'angular2/core';
import { InInput } from '../InInput.component';
import { NG_VALUE_ACCESSOR } from 'angular2/common';

declare const __moduleName: string;

const IN_INPUT_NUMBER_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InInputNumber),
    multi: true
  }
);

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=number][ngControl]',
  templateUrl: 'InInputNumber.html',
  providers: [IN_INPUT_NUMBER_CONTROL_VALUE_ACCESSOR]
})
export class InInputNumber extends InInput {
  @Input()
  private field: string;

  @Input()
  private label: string;

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
