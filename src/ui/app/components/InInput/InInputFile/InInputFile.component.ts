import { Component, Input, forwardRef, Provider, ViewEncapsulation, ViewChild } from 'angular2/core';
import { NG_VALUE_ACCESSOR } from 'angular2/common';
import { InInput } from '../InInput.component';
import { InIcon } from '../../InIcon/InIcon.component';

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
    '../../InButton/InButton.css',
    '../InInput.css',
    'InInputFile.css'
  ],
  directives: [InIcon],
  providers: [IN_INPUT_FILE_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.Native
})
export class InInputFile extends InInput {
  @Input()
  private field: string;

  @Input()
  private label: string;

  @ViewChild('fileInput')
  private fileInput;

  private get value(): string {
    return this.modelValue;
  }

  private set value(newValue: string) {
    if (newValue !== this.modelValue) {
      this.modelValue = newValue;

      this.onChange(newValue);
    }
  }

  private fileButtonClick() {
    this.fileInput.nativeElement.click();
  }

  private updateFile(event: Event): void {
    this.value = event.target.files[0].path;
  }
}
