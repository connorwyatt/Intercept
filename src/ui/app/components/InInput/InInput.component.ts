import { ControlValueAccessor } from 'angular2/common';

export class InInput implements ControlValueAccessor {
  protected onChange = (_: any) => {};
  protected onTouched = () => {};

  protected modelValue: any;

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
