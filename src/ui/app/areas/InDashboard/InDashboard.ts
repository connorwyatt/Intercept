import { Component, ViewEncapsulation, OnInit } from 'angular2/core';
import { InRequestsList } from '../../components/InRequestsList/InRequestsList.component';
import { InHttp } from '../../services/InHttp';
import { InRequestsHelper } from '../../services/InRequestsHelper';

declare const __moduleName: String;

@Component({
  moduleId: __moduleName,
  selector: 'in-dashboard',
  templateUrl: 'InDashboard.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InCard/InCard.css',
    '../../components/InGrid/InGrid.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InRequestsList]]
})
export class InDashboard implements OnInit {
  private requestsHelper: InRequestsHelper;
  private http: InHttp;
  private proxySettings: Object;
  private proxySettingsResolved: boolean;
  private targetHostSettings: Object;
  private targetHostSettingsResolved: boolean;

  private get requests() {
    return this.requestsHelper.getRequests();
  }

  constructor(requestsHelper: InRequestsHelper,
              http: InHttp) {
    this.requestsHelper = requestsHelper;
    this.http = http;
  }

  ngOnInit() {
    this.getProxySettings();
    this.getTargetHostSettings();
  }

  private getProxySettings() {
    this.http.get('/settings/proxy')
      .subscribe((data) => {
        this.proxySettings = data.data.ProxySettings;
        this.proxySettingsResolved = true;
      }, (error) => {
        console.error(error);
      });
  }

  private getTargetHostSettings() {
    this.http.get('/settings/targetHost')
      .subscribe((data) => {
        this.targetHostSettings = data.data.TargetHostSettings;
        this.targetHostSettingsResolved = true;
      }, (error) => {
        console.error(error);
      });
  }
}
