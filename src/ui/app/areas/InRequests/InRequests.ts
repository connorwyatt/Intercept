import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InCard } from '../../components/InCard/InCard.component';
import { InTable } from '../../components/InTable/InTable.component';
import { InRequestsHelper } from '../../services/InRequestsHelper';
import { InCollectionFilterPipe } from '../../pipes/InCollectionFilter.pipe';
import { IInTableField } from '../../components/InTable/IInTableField';
import { IInRequest } from '../../interfaces/IInRequest';
import { InInputText } from '../../components/InInput/InInputText/InInputText.component';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-requests',
  templateUrl: 'InRequests.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InGrid/InGrid.css',
    'InRequests.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InCard, InTable, InInputText]],
  pipes: [InCollectionFilterPipe]
})
export class InRequests {
  private requests: Observable<Array<IInRequest>>;
  private requestsFields: Array<IInTableField> = [
    { fieldname: 'method', label: 'Method', width: '15%', centred: true },
    { fieldname: 'statusCode', label: 'Status Code', width: '15%', centred: true },
    { fieldname: 'url', label: 'URL', width: '55%' },
    { fieldname: 'latency', label: 'Latency', width: '15%', centred: true }
  ];

  constructor(requestsHelper: InRequestsHelper) {
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
