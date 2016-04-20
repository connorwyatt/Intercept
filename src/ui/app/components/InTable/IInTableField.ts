export interface IInTableField {
  fieldname: string;
  label: string;
  getValue?: (model: Object) => any;
}
