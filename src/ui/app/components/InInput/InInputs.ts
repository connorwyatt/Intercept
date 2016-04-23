import { CONST_EXPR } from 'angular2/src/facade/lang';
import { InInputText } from './InInputText/InInputText.component';
import { InInputNumber } from './InInputNumber/InInputNumber.component';
import { InInputSelect } from './InInputSelect/InInputSelect.component';

export const IN_INPUTS = CONST_EXPR([
  InInputText,
  InInputNumber,
  InInputSelect
]);
