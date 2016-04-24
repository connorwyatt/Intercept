import { Component, Input, forwardRef, Provider, ViewEncapsulation } from 'angular2/core';
import { NG_VALUE_ACCESSOR } from 'angular2/common';
import { InInput } from '../InInput.component';

declare const __moduleName: string;

const IN_INPUT_FILE_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InInputFile),
    multi: true
  }
);

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=file][ngControl]',
  templateUrl: 'InInputFile.html',
  styleUrls: [
    '../../../styles/core.css',
  ],
  providers: [IN_INPUT_FILE_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.Native
})
export class InInputFile extends InInput {
  @Input()
  private field: string;

  @Input()
  private label: string;

  private get value(): File {
    return this.modelValue;
  }

  private set value(newValue: File) {
    if (newValue !== this.modelValue) {
      this.modelValue = newValue;

      this.onChange(newValue);
    }
  }

  private updateFile(event: Event) {
    this.value = event.target.files[0];
  }
}
