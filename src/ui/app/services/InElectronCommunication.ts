import {
  Injectable,
  NgZone
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IInElectronCommunicationData } from '../interfaces/IInElectronCommunicationData';
import { ElectronIPC } from './ElectronIpc';

@Injectable()
export class InElectronCommunication {
  constructor(private _zone: NgZone,
              private _electronIpc: ElectronIPC) {}

  public listen(channel: string): Observable<IInElectronCommunicationData<any>> {
    return Observable.create((observer) => {
      this._electronIpc.on(channel, (event, type, message) => {
        this._zone.run(() => {
          observer.next({ event, type, message: JSON.parse(message) });
        });
      });
    });
  }
}
