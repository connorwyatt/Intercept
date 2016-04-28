import { Component, Input, ViewEncapsulation, ViewChild, Self } from 'angular2/core';
import { InInput } from '../InInput.component';
import { InIcon } from '../../InIcon/InIcon.component';
import { NgControl } from 'angular2/common';
import { InValidationErrorsPipe } from '../../../pipes/InValidationErrors.pipe';
import { InMessages } from '../../InMessages/InMessages.component';

declare const __moduleName: string;

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
  directives: [[InIcon, InMessages]],
  pipes: [InValidationErrorsPipe],
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

  constructor(@Self() control: NgControl) {
    super(control);
  }
}
