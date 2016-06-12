import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllRequests } from '../../state/reducers/requestsReducer';
import { Observable } from 'rxjs/Observable';
import { InCard } from '../../components/InCard/InCard.component';
import { InStatusIndicator } from '../../components/InStatusIndicator/InStatusIndicator.component';
import { InStatusIndication } from '../../components/InStatusIndicator/InStatusIndication';
import { InTable } from '../../components/InTable/InTable.component';
import { InHttp } from '../../services/InHttp';
import { IInRequest } from '../../interfaces/IInRequest';
import { IInTableField } from '../../components/InTable/IInTableField';
import { IInRequest } from '../../interfaces/IInRequest';
import { IInAPIData } from '../../interfaces/IInAPIData';
import { IInProxySettings } from '../../interfaces/IInProxySettings';
import { IInTargetHostSettings } from '../../interfaces/IInTargetHostSettings';

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
  private requests: Observable<Array<IInRequest>>;
  private proxySettings: IInProxySettings;
  private targetHostSettings: IInTargetHostSettings;
  private requestsFields: Array<IInTableField> = [
    { fieldname: 'method', label: 'Method', width: '25%', centred: true },
    { fieldname: 'statusCode', label: 'Status Code', width: '25%', centred: true },
    { fieldname: 'url', label: 'URL', width: '50%' }
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

  constructor(private _http: InHttp,
              store: Store) {
    this.requests = store.let(getAllRequests());
  }

  ngOnInit() {
    this.getProxySettings();
    this.getTargetHostSettings();
  }

  private getProxySettings() {
    this._http.get('/settings/proxy')
      .subscribe((data: IInAPIData<IInProxySettings>) => {
        this.proxySettings = data.data['ProxySettings'];
      }, (error) => {
        console.error(error);
      });
  }

  private getTargetHostSettings() {
    this._http.get('/settings/targetHost')
      .subscribe((data: IInAPIData<IInTargetHostSettings>) => {
        this.targetHostSettings = data.data['TargetHostSettings'];
      }, (error) => {
        console.error(error);
      });
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
