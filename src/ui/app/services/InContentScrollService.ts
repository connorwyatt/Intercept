import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class InContentScrollService {
  private scrollSubject: Subject<void>;

  constructor() {
    this.scrollSubject = new Subject<void>();
  }

  public next(): void {
    this.scrollSubject.next(null);
  }

  public getObservable(): Observable<void> {
    return this.scrollSubject.asObservable();
  }
}
