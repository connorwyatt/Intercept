import { Component, Input, ViewEncapsulation, Self } from '@angular/core';
import { NgControl } from '@angular/common';
import { InInput } from '../InInput.component';
import { InMessages } from '../../InMessages/InMessages.component';
import { InValidationErrorsPipe } from '../../../pipes/InValidationErrors.pipe';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=number]',
  templateUrl: 'InInputNumber.html',
  styleUrls: [
    '../../../styles/core.css',
    '../InInput.css'
  ],
  directives: [[InMessages]],
  pipes: [InValidationErrorsPipe],
  encapsulation: ViewEncapsulation.Native
})
export class InInputNumber extends InInput {
  @Input()
  private field: string;

  @Input()
  private label: string;

  private get value(): number {
    return this.modelValue;
  }

  private set value(newValue: number) {
    if (newValue !== this.modelValue) {
      if (isNaN(newValue)) {
        this.modelValue = null;

        this.onChange(null);
      } else {
        this.modelValue = newValue;

        this.onChange(newValue);
      }
    }
  }

  constructor(@Self() control: NgControl) {
    super(control);
  }
}
