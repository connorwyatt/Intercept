import { Component, ViewEncapsulation } from 'angular2/core';
import { InRequestsList } from '../../components/InRequestsList/InRequestsList.component';
import { InRequestsHelper } from '../../services/InRequestsHelper';

declare const __moduleName: String;

@Component({
  moduleId: __moduleName,
  selector: 'in-requests',
  templateUrl: 'InRequests.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InCard/InCard.css',
    '../../components/InGrid/InGrid.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InRequestsList]]
})
export class InRequests {
  private requestsHelper: InRequestsHelper;

  private get requests() {
    return this.requestsHelper.getRequests();
  }

  constructor(requestsHelper: InRequestsHelper) {
    this.requestsHelper = requestsHelper;
  }
}
