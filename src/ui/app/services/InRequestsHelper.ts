import { Injectable } from 'angular2/core';
import { InSocket } from './InSocket';
import { IInRequest } from '../interfaces/IInRequest';

@Injectable()
export class InRequestsHelper {
  private socket: InSocket;
  private requests: Array<IInRequest> = [];

  constructor(socket: InSocket) {
    this.socket = socket;

    this.listenForRequests();
  }

  private listenForRequests(): void {
    let connection = this.socket.connect('/requests');

    connection.get('requestStart')
      .map((requestStart: IInRequest) => {
        requestStart.timestamp = new Date(<string> requestStart.timestamp);

        return requestStart;
      })
      .subscribe((requestStart: IInRequest) => {
        this.requests.push(requestStart);
      });

    connection.get('requestEnd')
      .subscribe((requestEnd: IInRequest) => {
        let request = this.requests.find((request: IInRequest) => {
          return request.id === requestEnd.id;
        });

        Object.assign(request, requestEnd);
      });
  }

  public getRequests(): Array<IInRequest> {
    return this.requests;
  }

  public clearRequests(): void {
    this.requests = [];
  }
}
