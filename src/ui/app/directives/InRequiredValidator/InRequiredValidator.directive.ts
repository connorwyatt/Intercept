import { forwardRef, Provider, Directive, Input, provide } from 'angular2/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from 'angular2/common';
import { CONST_EXPR } from 'angular2/src/facade/lang';
import { ValidatorFn } from 'angular2/src/common/forms/directives/validators';
import { IInMessage } from '../../interfaces/IInMessage';

const IN_REQUIRED_VALIDATOR = CONST_EXPR(
  new Provider(NG_VALIDATORS, { useExisting: forwardRef(() => InRequiredValidator), multi: true })
);

@Directive({
  selector: '[inRequired][ngControl]',
  providers: [
    IN_REQUIRED_VALIDATOR,
    provide(Validators, { useValue: Validators })
  ]
})
export class InRequiredValidator implements Validator {
  @Input('inRequired')
  private isRequired: boolean;
  private validators;

  private _validator: ValidatorFn = (control: AbstractControl): { [key: string]: IInMessage } => {
    if (this.isRequired) {
      let errors = this.validators.required(control);

      if (errors) {
        return {
          inRequired: {
            body: 'This field is required.'
          }
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  constructor(validators: Validators) {
    this.validators = validators;
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this._validator(control);
  }
}
