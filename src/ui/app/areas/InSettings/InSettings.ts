import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NgForm } from '@angular/common';
import { Store } from '@ngrx/store';
import { CLEAR_REQUESTS } from '../../state/actions/requestsActions';
import { InCard } from '../../components/InCard/InCard.component';
import { InRequiredValidator } from '../../directives/InRequiredValidator/InRequiredValidator.directive';
import { InHttp } from '../../services/InHttp';
import { InMessagesHelper } from '../../services/InMessagesHelper';
import { IN_INPUTS } from '../../components/InInput/InInputs';
import { IInMessage } from '../../interfaces/IInMessage';
import { IInAPIData } from '../../interfaces/IInAPIData';
import { IInTargetHostSettings } from '../../interfaces/IInTargetHostSettings';
import { IInProxySettings } from '../../interfaces/IInProxySettings';

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
  private proxySettings: IInProxySettings;
  private proxySettingsResolved: Boolean;
  private proxySettingsMessages: Array<IInMessage>;
  private targetHostSettings: IInTargetHostSettings;
  private targetHostSettingsResolved: Boolean;
  private targetHostSettingsMessages: Array<IInMessage>;
  private proxySettingsSubmitting: Boolean;
  private targetHostSettingsSubmitting: Boolean;

  constructor(private _http: InHttp,
              private _store: Store,
              private _messagesHelper: InMessagesHelper) {
  }

  ngOnInit() {
    this.getProxySettings();
    this.getTargetHostSettings();
  }

  private getProxySettings() {
    this._http.get('/settings/proxy')
      .subscribe((data: IInAPIData<IInProxySettings>) => {
        this.proxySettings = data.data['ProxySettings'];
        this.proxySettingsResolved = true;
      }, (error) => {
        console.error(error);
      });
  }

  private getTargetHostSettings() {
    this._http.get('/settings/targetHost')
      .subscribe((data: IInAPIData<IInTargetHostSettings>) => {
        this.targetHostSettings = data.data['TargetHostSettings'];
        this.targetHostSettingsResolved = true;
      }, (error) => {
        console.error(error);
      });
  }

  private onSubmitProxySettings(form: NgForm) {
    this.proxySettingsSubmitting = true;

    this._http.put('/settings/proxy', form.value)
      .subscribe((data: IInAPIData<IInProxySettings>) => {
        this.proxySettings = data.data['ProxySettings'];
        this.proxySettingsMessages = this._messagesHelper.flattenMessages(this._messagesHelper.getSaveMessage());
        this._store.dispatch({ type: CLEAR_REQUESTS });
      }, (err) => {
        let errors: IInAPIData<IInProxySettings> = err.json();

        this.proxySettingsMessages = this._messagesHelper.flattenMessages(errors.meta.messages);

        this.proxySettingsSubmitting = false;
      }, () => {
        this.proxySettingsSubmitting = false;
      });
  }

  private onSubmitTargetHostSettings(form: NgForm) {
    this.targetHostSettingsSubmitting = true;

    this._http.put('/settings/targetHost', form.value)
      .subscribe((data: IInAPIData<IInTargetHostSettings>) => {
        this.targetHostSettings = data.data['TargetHostSettings'];
        this.targetHostSettingsMessages = this._messagesHelper.flattenMessages(this._messagesHelper.getSaveMessage());
        this._store.dispatch({ type: CLEAR_REQUESTS });
      }, (err) => {
        let errors: IInAPIData<IInTargetHostSettings> = err.json();

        this.targetHostSettingsMessages = this._messagesHelper.flattenMessages(errors.meta.messages);

        this.targetHostSettingsSubmitting = false;
      }, () => {
        this.targetHostSettingsSubmitting = false;
      });
  }
}
