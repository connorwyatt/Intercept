import { Component, OnInit } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { InHttp } from '../../services/InHttp';

@Component({
  selector: 'in-settings',
  templateUrl: 'app/areas/InSettings/InSettings.html'
})
export class InSettings implements OnInit {
  private http: InHttp;
  private proxySettings: Object;
  private proxySettingsResolved: Boolean;
  private targetHostSettings: Object;
  private targetHostSettingsResolved: Boolean;
  private proxySettingsSubmitting: Boolean;
  private targetHostSettingsSubmitting: Boolean;

  constructor(http: InHttp) {
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

  private onSubmitProxySettings(form: NgForm) {
    this.proxySettingsSubmitting = true;

    this.http.put('/settings/proxy', form.value)
      .subscribe((data) => {
        this.proxySettings = data.data.ProxySettings;
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
      }, (error) => {
        console.error(error);
        this.targetHostSettingsSubmitting = false;
      }, () => {
        this.targetHostSettingsSubmitting = false;
      });
  }
}
