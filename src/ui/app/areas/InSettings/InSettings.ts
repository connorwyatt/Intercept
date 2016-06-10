import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/common';
import { InCard } from '../../components/InCard/InCard.component';
import { InRequiredValidator } from '../../directives/InRequiredValidator/InRequiredValidator.directive';
import { InHttp } from '../../services/InHttp';
import { InRequestsHelper } from '../../services/InRequestsHelper';
import { InMessagesHelper } from '../../services/InMessagesHelper';
import { IN_INPUTS } from '../../components/InInput/InInputs';
import { IInMessage } from '../../interfaces/IInMessage';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-settings',
  templateUrl: 'InSettings.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InGrid/InGrid.css',
    '../../components/InForm/InForm.css',
    '../../components/InButton/InButton.css'
  ],
  directives: [[IN_INPUTS, InCard, InRequiredValidator]],
  encapsulation: ViewEncapsulation.Native
})
export class InSettings implements OnInit {
  private http: InHttp;
  private requestsHelper: InRequestsHelper;
  private messagesHelper: InMessagesHelper;
  private proxySettings: Object;
  private proxySettingsResolved: Boolean;
  private proxySettingsMessages: Array<IInMessage>;
  private targetHostSettings: Object;
  private targetHostSettingsResolved: Boolean;
  private targetHostSettingsMessages: Array<IInMessage>;
  private proxySettingsSubmitting: Boolean;
  private targetHostSettingsSubmitting: Boolean;

  constructor(http: InHttp,
              requestsHelper: InRequestsHelper,
              messagesHelper: InMessagesHelper) {
    this.http = http;
    this.requestsHelper = requestsHelper;
    this.messagesHelper = messagesHelper;
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
        this.proxySettingsMessages = this.messagesHelper.flattenMessages(this.messagesHelper.getSaveMessage());
        this.requestsHelper.clearRequests();
      }, (err) => {
        let errors = err.json();

        this.proxySettingsMessages = this.messagesHelper.flattenMessages(errors.meta.messages);

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
        this.targetHostSettingsMessages = this.messagesHelper.flattenMessages(this.messagesHelper.getSaveMessage());
        this.requestsHelper.clearRequests();
      }, (err) => {
        let errors = err.json();

        this.targetHostSettingsMessages = this.messagesHelper.flattenMessages(errors.meta.messages);

        this.targetHostSettingsSubmitting = false;
      }, () => {
        this.targetHostSettingsSubmitting = false;
      });
  }
}
