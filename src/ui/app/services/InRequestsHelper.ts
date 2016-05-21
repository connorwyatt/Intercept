import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { InElectronCommunication } from './InElectronCommunication';
import { IInRequest } from '../interfaces/IInRequest';
import { IInElectronCommunicationData } from '../interfaces/IInElectronCommunicationData';

@Injectable()
export class InRequestsHelper {
  private electronCommunication: InElectronCommunication;
  private requests: Array<IInRequest> = [];
  private observable: Subject<Array<IInRequest>>;

  constructor(electronCommunication: InElectronCommunication) {
    this.electronCommunication = electronCommunication;

    this.listenForRequests();

    this.createObservable();
  }

  private listenForRequests(): void {
    let observable = this.electronCommunication.listen('requests');

    observable.filter((data: IInElectronCommunicationData<IInRequest>) => data.type === 'requestStart')
      .map(data => data.message)
      .map((requestStarts: Array<IInRequest>) => {
        return requestStarts.map((requestStart: IInRequest) => {
          requestStart.timestamp = new Date(<string> requestStart.timestamp);

          return requestStart;
        }).reverse();
      })
      .subscribe(requestStarts => {
        this.requests = [...requestStarts, ...this.requests].slice(0, 5000);

        this.observable.next([...this.requests]);
      });

    observable.filter((data: IInElectronCommunicationData<IInRequest>) => data.type === 'requestEnd')
      .map(data => data.message)
      .subscribe((requestEnds: Array<IInRequest>) => {
        requestEnds.forEach((requestEnd: IInRequest) => {
          let request = this.requests.find((request: IInRequest) => {
            return request.id === requestEnd.id;
          });

          if (request) {
            Object.assign(request, requestEnd);
          }
        });

        this.observable.next([...this.requests]);
      });
  }

  private createObservable(): void {
    this.observable = new BehaviorSubject(this.requests);
  }

  public getRequests(): Subject<Array<IInRequest>> {
    return this.observable;
  }

  public clearRequests(): void {
    this.requests = [];
  }
}
