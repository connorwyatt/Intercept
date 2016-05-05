import { Component, Input, ViewEncapsulation, Self } from '@angular/core';
import { NgControl } from '@angular/common';
import { InInput } from '../InInput.component';
import { InMessages } from '../../InMessages/InMessages.component';
import { InValidationErrorsPipe } from '../../../pipes/InValidationErrors.pipe';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=text]',
  templateUrl: 'InInputText.html',
  styleUrls: [
    '../../../styles/core.css',
    '../InInput.css'
  ],
  directives: [[InMessages]],
  pipes: [InValidationErrorsPipe],
  encapsulation: ViewEncapsulation.Native
})
export class InInputText extends InInput {
  @Input()
  private field: string;

  @Input()
  private label: string;

  @Input()
  private placeholder: string;

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
