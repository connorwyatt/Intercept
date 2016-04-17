import { Component, ViewEncapsulation } from 'angular2/core';
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
  pipes: [InReversePipe]
})
export class InRequests {
  private requestsHelper: InRequestsHelper;
  private requestsFields: Array<IInTableField> = [
    { fieldname: 'timestamp', label: 'Time' },
    { fieldname: 'method', label: 'Method' },
    { fieldname: 'statusCode', label: 'Status Code' },
    { fieldname: 'url', label: 'URL' },
    { fieldname: 'latency', label: 'Latency' }
  ];


  private get requests(): Array<IInRequest> {
    return this.requestsHelper.getRequests();
  }

  constructor(requestsHelper: InRequestsHelper) {
    this.requestsHelper = requestsHelper;
  }

  private requestsRowClass(model: Object): string {
    if (model.statusCode >= 400 && model.statusCode < 600) {
      return 'negative';
    } else {
      return 'positive';
    }
  }
}
