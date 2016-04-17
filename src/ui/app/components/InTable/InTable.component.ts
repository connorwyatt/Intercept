import { Component, Input } from 'angular2/core';
import { IInTableField } from './IInTableField';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-table',
  templateUrl: 'InTable.html',
  styleUrls: [
    '../../styles/core.css',
    'InTable.css'
  ]
})
export class InTable {
  @Input()
  private fields: Array<IInTableField>;

  @Input()
  private data: Array<Object>;

  @Input()
  private rowClass: (model: Object) => string;

  private getRowClass(model: Object): string {
    if (typeof this.rowClass === 'function') {
      return 'is-' + this.rowClass(model);
    } else {
      return null;
    }
  }

  private getFieldViewValue(field: IInTableField,
                            model: Object): any {
    return model[field.fieldname];
  }
}
