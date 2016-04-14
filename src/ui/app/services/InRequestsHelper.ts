import { Injectable } from 'angular2/core';
import { InSocket } from './InSocket';

@Injectable()
export class InRequestsHelper {
  private socket: InSocket;
  private requests: Array<IRequest> = [];

  constructor(socket: InSocket) {
    this.socket = socket;

    this.listenForRequests();
  }

  private listenForRequests(): void {
    let connection = this.socket.connect('/requests');

    connection.get('requestStart')
      .map((requestStart: IRequest) => {
        requestStart.timestamp = new Date(<String> requestStart.timestamp);

        return requestStart;
      })
      .subscribe((requestStart: IRequest) => {
        this.requests.push(requestStart);
      });

    connection.get('requestEnd')
      .subscribe((requestEnd: IRequest) => {
        let request = this.requests.find((request: IRequest) => {
          return request.id === requestEnd.id;
        });

        Object.assign(request, requestEnd);
      });
  }

  public getRequests(): Array<IRequest> {
    return this.requests;
  }
}
