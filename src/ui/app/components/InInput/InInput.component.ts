import { ControlValueAccessor, NgControl } from 'angular2/common';

export class InInput implements ControlValueAccessor {
  protected onChange = (_: any) => {};
  protected onTouched = () => {};

  protected modelValue: any;
  protected control: NgControl;

  protected get isTouched(): boolean {
    return this.control.touched;
  }

  protected get errors(): { [key: string]: any } {
    return this.control.errors;
  }

  constructor(control: NgControl) {
    control.valueAccessor = this;
    this.control = control;
  }

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
