import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IInElectronCommunicationData } from '../interfaces/IInElectronCommunicationData';
import { ElectronIPC } from './ElectronIpc';

@Injectable()
export class InElectronCommunication {
  private zone: NgZone;
  private electronIpc: ElectronIPC;

  constructor(zone: NgZone,
              electronIpc: ElectronIPC) {
    this.zone = zone;
    this.electronIpc = electronIpc;
  }

  public listen(channel: string): Observable<IInElectronCommunicationData<any>> {
    return Observable.create((observer) => {
      this.electronIpc.on(channel, (event, type, message) => {
        this.zone.run(() => {
          observer.next({ event, type, message: JSON.parse(message) });
        });
      });
    });
  }
}
