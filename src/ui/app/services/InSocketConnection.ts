import {Observable} from 'rxjs/Rx';

export class InSocketConnection {
  private connection: any;

  constructor(connection: any) {
    this.connection = connection;
  }

  get(type: string): Observable<Array<any>|Object> {
    return Observable.create((observer) => {
      this.connection.on(type, (data) => {
        observer.next(JSON.parse(data));
      });
    });
  }
}
