import { Component, ViewEncapsulation } from 'angular2/core';
import { DatePipe } from 'angular2/common';
import { InCard } from '../../components/InCard/InCard.component';
import { InTable } from '../../components/InTable/InTable.component';
import { InRequestsHelper } from '../../services/InRequestsHelper';
import { InReversePipe } from '../../pipes/InReverse.pipe';
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
  providers: [DatePipe]
})
export class InRequests {
  private datePipe: DatePipe;
  private requestsHelper: InRequestsHelper;
  private requestsFields: Array<IInTableField> = [
    {
      fieldname: 'timestamp', label: 'Time', getValue: (model: IInRequest) => {
        return this.datePipe.transform(model.timestamp, ['medium']);
      }
    },
    { fieldname: 'method', label: 'Method' },
    { fieldname: 'statusCode', label: 'Status Code' },
    { fieldname: 'url', label: 'URL' },
    { fieldname: 'latency', label: 'Latency' }
  ];

  private get requests(): Array<IInRequest> {
    return this.requestsHelper.getRequests();
  }

  constructor(datePipe: DatePipe,
              requestsHelper: InRequestsHelper) {
    this.datePipe = datePipe;
    this.requestsHelper = requestsHelper;
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
