import { Component, OnInit } from 'angular2/core';
import { InSocket } from '../../services/InSocket';
import { InRequestsList } from '../../components/InRequestsList/InRequestsList.component';

@Component({
  selector: 'in-dashboard',
  templateUrl: 'app/areas/InDashboard/InDashboard.html',
  directives: [[InRequestsList]]
})
export class InDashboard implements OnInit {
  private requests: Array<IRequest> = [];
  private socket: InSocket;

  constructor(socket: InSocket) {
    this.socket = socket;
  }

  ngOnInit() {
    this.listenForRequests();
  }

  private listenForRequests() {
    let connection = this.socket.connect('/requests');

    connection.get('requestStart')
      .map((requestStart: IRequest) => {
        requestStart.timestamp = new Date(<String> requestStart.timestamp);

        return requestStart;
      })
      .subscribe((requestStart: IRequest) => {
        this.requests.push(requestStart);
      });

    connection.get('requestEnd').subscribe((requestEnd: IRequest) => {
      let request = this.requests.find((request: IRequest) => {
        return request.id === requestEnd.id;
      });

      Object.assign(request, requestEnd);
    });
  }
}
