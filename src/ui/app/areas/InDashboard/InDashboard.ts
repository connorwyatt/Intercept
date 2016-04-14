import { Component } from 'angular2/core';
import { InRequestsList } from '../../components/InRequestsList/InRequestsList.component';
import { InRequestsHelper } from '../../services/InRequestsHelper';

@Component({
  selector: 'in-dashboard',
  templateUrl: 'app/areas/InDashboard/InDashboard.html',
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
