import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { InElectronCommunication } from './InElectronCommunication';
import { IInRequest } from '../interfaces/IInRequest';
import { IInElectronCommunicationData } from '../interfaces/IInElectronCommunicationData';
import {
  NEW_REQUEST_STARTS,
  NEW_REQUEST_ENDS
} from '../state/actions/requestActions';

@Injectable()
export class InRequestsHelper {
  constructor(private _electronCommunication: InElectronCommunication,
              private _store: Store) {}

  public init(): void {
    let observable = this._electronCommunication.listen('requests');

    observable.filter((data: IInElectronCommunicationData<IInRequest>) => data.type === 'requestStart')
      .map(data => data.message)
      .map((requestStarts: Array<IInRequest>) => {
        return requestStarts.reverse();
      })
      .subscribe(requestStarts => {
        this._store.dispatch({ type: NEW_REQUEST_STARTS, payload: requestStarts });
      });

    observable.filter((data: IInElectronCommunicationData<IInRequest>) => data.type === 'requestEnd')
      .map(data => data.message)
      .subscribe((requestEnds: Array<IInRequest>) => {
        this._store.dispatch({ type: NEW_REQUEST_ENDS, payload: requestEnds });
      });
  }
}
