import {
  Component,
  Input,
  ViewEncapsulation,
  Self
} from '@angular/core';
import { NgControl } from '@angular/common';
import { InInput } from '../InInput.component';
import { InMessages } from '../../InMessages/InMessages.component';
import { InIcon } from '../../InIcon/InIcon.component';
import { InValidationErrorsPipe } from '../../../pipes/InValidationErrors.pipe';
import { IInKeyValue } from '../../../interfaces/IInKeyValue';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-input[type=multiKeyValue]',
  templateUrl: 'InInputMultiKeyValue.html',
  styleUrls: [
    '../../../styles/core.css',
    '../../InButton/InButton.css',
    '../InInput.css',
    'InInputMultiKeyValue.css'
  ],
  directives: [[InMessages, InIcon]],
  pipes: [InValidationErrorsPipe],
  encapsulation: ViewEncapsulation.Native
})
export class InInputMultiKeyValue extends InInput {
  @Input()
  private field: string;

  @Input()
  private label: string;

  @Input()
  private placeholder: string;

  private get value(): Array<IInKeyValue> {
    return this.modelValue || [];
  }

  private changed(index: number, key: string, value: string): void {
    this.modelValue[index][key] = value;

    this.onChange(this.modelValue);
  }

  private addNew(): void {
    let newItem = { key: null, value: null };

    if (Array.isArray(this.modelValue)) {
      this.modelValue.push(newItem);
    } else {
      this.modelValue = [newItem];
    }

    this.onChange(this.modelValue);
  }

  private remove(index: number): void {
    this.modelValue.splice(index, 1);
  }

  constructor(@Self() control: NgControl) {
    super(control);
  }
}
