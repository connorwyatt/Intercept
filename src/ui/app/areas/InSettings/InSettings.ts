import { Component, OnInit, ViewEncapsulation } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { InCard } from '../../components/InCard/InCard.component';
import { InHttp } from '../../services/InHttp';
import { InRequestsHelper } from '../../services/InRequestsHelper';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-settings',
  templateUrl: 'InSettings.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InCard/InCard.css',
    '../../components/InGrid/InGrid.css',
    '../../components/InButton/InButton.css',
    'InSettings.css'
  ],
  directives: [[InCard]],
  encapsulation: ViewEncapsulation.Native
})
export class InSettings implements OnInit {
  private http: InHttp;
  private requestsHelper: InRequestsHelper;
  private proxySettings: Object;
  private proxySettingsResolved: Boolean;
  private targetHostSettings: Object;
  private targetHostSettingsResolved: Boolean;
  private proxySettingsSubmitting: Boolean;
  private targetHostSettingsSubmitting: Boolean;

  constructor(http: InHttp,
              requestsHelper: InRequestsHelper) {
    this.http = http;
    this.requestsHelper = requestsHelper;
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

  private onSubmitProxySettings(form: NgForm) {
    this.proxySettingsSubmitting = true;

    this.http.put('/settings/proxy', form.value)
      .subscribe((data) => {
        this.proxySettings = data.data.ProxySettings;
        this.requestsHelper.clearRequests();
      }, (error) => {
        console.error(error);
        this.proxySettingsSubmitting = false;
      }, () => {
        this.proxySettingsSubmitting = false;
      });
  }

  private onSubmitTargetHostSettings(form: NgForm) {
    this.targetHostSettingsSubmitting = true;

    this.http.put('/settings/targetHost', form.value)
      .subscribe((data) => {
        this.targetHostSettings = data.data.TargetHostSettings;
        this.requestsHelper.clearRequests();
      }, (error) => {
        console.error(error);
        this.targetHostSettingsSubmitting = false;
      }, () => {
        this.targetHostSettingsSubmitting = false;
      });
  }
}
