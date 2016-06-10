import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InCard } from '../../components/InCard/InCard.component';
import { InStatusIndicator } from '../../components/InStatusIndicator/InStatusIndicator.component';
import { InStatusIndication } from '../../components/InStatusIndicator/InStatusIndication';
import { InTable } from '../../components/InTable/InTable.component';
import { InHttp } from '../../services/InHttp';
import { InRequestsHelper } from '../../services/InRequestsHelper';
import { IInRequest } from '../../interfaces/IInRequest';
import { IInTableField } from '../../components/InTable/IInTableField';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-dashboard',
  templateUrl: 'InDashboard.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InGrid/InGrid.css',
    'InDashboard.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InCard, InStatusIndicator, InTable]]
})
export class InDashboard implements OnInit {
  private http: InHttp;
  private requests: Observable<Array<IInRequest>>;
  private proxySettings: Object;
  private proxySettingsResolved: boolean;
  private targetHostSettings: Object;
  private targetHostSettingsResolved: boolean;
  private requestsFields: Array<IInTableField> = [
    { fieldname: 'method', label: 'Method' },
    { fieldname: 'statusCode', label: 'Status Code' },
    { fieldname: 'url', label: 'URL' }
  ];

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
    this.http = http;

    this.requests = requestsHelper.getRequests();
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

  private requestsRowClass(model: IInRequest): string {
    if (model.statusCode >= 400 && model.statusCode < 600) {
      return 'negative';
    } else if (model.statusCode >= 200 && model.statusCode < 400) {
      return 'positive';
    }
  }
}
