import { default as io } from 'socket.io';
import { InSocketConnection } from './InSocketConnection';

export class InSocket {
  private io: any;

  constructor() {
    this.io = io;
  }

  public connect(url?: String): InSocketConnection {
    if (url) {
      return new InSocketConnection(this.io(url));
    } else {
      return new InSocketConnection(this.io());
    }
  }
}
