export interface IInTableField {
  fieldname: string;
  label: string;
  width: string;
  centred?: boolean;
  getValue?: (model: Object) => any;
}
