import { Component, OnInit } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { InHttp } from '../services/InHttp';
import { InSocket } from '../services/InSocket';
import { InRequestsList } from '../components/InRequestsList/InRequestsList.component';

@Component({
  selector: 'in-dashboard',
  templateUrl: 'app/areas/InDashboard.html',
  directives: [[InRequestsList]]
})
export class InDashboard implements OnInit {
  private http: InHttp;
  private proxySettings: Object;
  private proxySettingsResolved: Boolean;
  private targetHostSettings: Object;
  private targetHostSettingsResolved: Boolean;
  private proxySettingsSubmitting: Boolean;
  private targetHostSettingsSubmitting: Boolean;
  private requests: Array<Object> = [];
  private socket: InSocket;

  constructor(http: InHttp, socket: InSocket) {
    this.http = http;
    this.socket = socket;
  }

  ngOnInit() {
    this.getProxySettings();
    this.getTargetHostSettings();
    this.listenForRequests();
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

  private listenForRequests() {
    let connection = this.socket.connect('/requests');
    connection.get('requestStart').subscribe((requestStart) => {
      requestStart.timestamp = new Date(requestStart.timestamp);

      this.requests.push(requestStart);
    });
    connection.get('requestEnd').subscribe((requestEnd) => {
      let request = this.requests.find((request) => {
        return request.id === requestEnd.id;
      });

      Object.assign(request, requestEnd);
    });
  }
}
