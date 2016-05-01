import { Component, ViewEncapsulation } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { InCard } from '../../components/InCard/InCard.component';
import { InTable } from '../../components/InTable/InTable.component';
import { InRequestsHelper } from '../../services/InRequestsHelper';
import { InReversePipe } from '../../pipes/InReverse.pipe';
import { InDatePipe } from '../../pipes/InDate.pipe';
import { IInTableField } from '../../components/InTable/IInTableField';
import { IInRequest } from '../../interfaces/IInRequest';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-requests',
  templateUrl: 'InRequests.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InCard/InCard.css',
    '../../components/InGrid/InGrid.css',
    'InRequests.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InCard, InTable]],
  pipes: [InReversePipe],
  providers: [InDatePipe]
})
export class InRequests {
  private datePipe: InDatePipe;
  private requests: Observable<Array<IInRequest>>;
  private requestsFields: Array<IInTableField> = [
    {
      fieldname: 'timestamp', label: 'Time', getValue: (model: IInRequest) => {
        return this.datePipe.transform(<Date> model.timestamp);
      }
    },
    { fieldname: 'method', label: 'Method' },
    { fieldname: 'statusCode', label: 'Status Code' },
    { fieldname: 'url', label: 'URL' },
    { fieldname: 'latency', label: 'Latency' }
  ];

  constructor(datePipe: InDatePipe,
              requestsHelper: InRequestsHelper) {
    this.datePipe = datePipe;
    this.requests = requestsHelper.getRequests();
  }

  private requestsRowClass(model: IInRequest): string {
    if (model.statusCode) {
      if (model.statusCode >= 400 && model.statusCode < 600) {
        return 'negative';
      } else {
        return 'positive';
      }
    }
  }
}
