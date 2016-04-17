import { Component, ViewEncapsulation } from 'angular2/core';
import { InRequestsList } from '../../components/InRequestsList/InRequestsList.component';
import { InRequestsHelper } from '../../services/InRequestsHelper';

declare const __moduleName: String;

@Component({
  moduleId: __moduleName,
  selector: 'in-dashboard',
  templateUrl: 'InDashboard.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InCard/InCard.css',
    'InDashboard.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InRequestsList]]
})
export class InDashboard {
  private requestsHelper: InRequestsHelper;

  private get requests() {
    return this.requestsHelper.getRequests();
  }

  constructor(requestsHelper: InRequestsHelper) {
    this.requestsHelper = requestsHelper;
  }
}
