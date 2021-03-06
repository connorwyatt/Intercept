import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IInTableField } from './IInTableField';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-table',
  templateUrl: 'InTable.html',
  styleUrls: [
    '../../styles/core.css',
    'InTable.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InTable {
  @Input() private fields: Array<IInTableField>;
  @Input() private data: Array<Object>;
  @Input() private showHighlightStyles: boolean;
  @Input() private rowClass: (model: Object) => string;
  @Output() private rowClick: EventEmitter<Object> = new EventEmitter<Object>();

  private getRowClass(model: Object): string {
    if (typeof this.rowClass === 'function') {
      return 'is-' + this.rowClass(model);
    } else {
      return null;
    }
  }

  private getFieldViewValue(field: IInTableField,
                            model: Object): any {
    if (field.getValue && typeof field.getValue === 'function') {
      return field.getValue(model);
    } else {
      return model[field.fieldname];
    }
  }

  private onRowClick(model: Object) {
    this.rowClick.emit(model);
  }

  private identity(index, item) {
    return item.id;
  }
}
