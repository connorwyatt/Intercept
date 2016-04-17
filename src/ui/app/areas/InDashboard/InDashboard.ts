import { Component, ViewEncapsulation, OnInit } from 'angular2/core';
import { InCard } from '../../components/InCard/InCard.component';
import { InStatusIndicator } from '../../components/InStatusIndicator/InStatusIndicator.component';
import { InRequestsList } from '../../components/InRequestsList/InRequestsList.component';
import { InHttp } from '../../services/InHttp';
import { InRequestsHelper } from '../../services/InRequestsHelper';
import { IInRequest } from '../../interfaces/IInRequest';
import { InStatusIndication } from '../../components/InStatusIndicator/InStatusIndication';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-dashboard',
  templateUrl: 'InDashboard.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InCard/InCard.css',
    '../../components/InGrid/InGrid.css',
    'InDashboard.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InCard, InStatusIndicator, InRequestsList]]
})
export class InDashboard implements OnInit {
  private requestsHelper: InRequestsHelper;
  private http: InHttp;
  private proxySettings: Object;
  private proxySettingsResolved: boolean;
  private targetHostSettings: Object;
  private targetHostSettingsResolved: boolean;

  private get requests(): Array<IInRequest> {
    return this.requestsHelper.getRequests();
  }

  private get proxyStatus(): InStatusIndication {
    let proxyStatus: InStatusIndication;
    
    if (this.proxySettings.port > 0) {
      proxyStatus = InStatusIndication.Positive;
    } else {
      proxyStatus = InStatusIndication.Negative;
    }

    return proxyStatus;
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
