import { Component, Input } from 'angular2/core';
import { DatePipe } from 'angular2/common';
import { InReversePipe } from '../../pipes/InReverse.pipe';
import { IInRequest } from '../../interfaces/IInRequest';

@Component({
  selector: 'in-requests-list',
  templateUrl: 'app/components/InRequestsList/InRequestsList.html',
  pipes: [DatePipe, InReversePipe]
})
export class InRequestsList {
  @Input()
  private requests: Array<IInRequest>;

  private hasError(request: IInRequest) {
    if (request && request.statusCode) {
      if (request.statusCode >= 400 && request.statusCode < 600) {
        return 'red';
      } else {
        return 'green';
      }
    }
  }
}
