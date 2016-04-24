import { Component, Input, forwardRef, Provider, ViewEncapsulation } from 'angular2/core';
import { NG_VALUE_ACCESSOR } from 'angular2/common';
import { InInput } from '../InInput.component';

declare const __moduleName: string;

const IN_INPUT_TEXT_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InInputText),
    multi: true
  }
);

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=text][ngControl]',
  templateUrl: 'InInputText.html',
  styleUrls: [
    '../../../styles/core.css',
    '../InInput.css'
  ],
  providers: [IN_INPUT_TEXT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.Native
})
export class InInputText extends InInput {
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
