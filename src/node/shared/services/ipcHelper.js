'use strict';

const windows = require('../../../ui/electron').windows,
  Rx = require('rxjs'),
  Subject = Rx.Subject;

class IPCHelper {
  constructor() {
    this.stores = {};
  }

  send(endpoint, type, data) {
    windows.mainWindow.send(endpoint, type, JSON.stringify(data));
  }

  sendThrottled(endpoint, type, data, time) {
    if (!this.stores[endpoint] || !this.stores[endpoint][type]) {
      this.stores[endpoint] = this.stores[endpoint] || {};

      this.stores[endpoint][type] = new Subject();

      let t = this.stores[endpoint][type]
        .bufferTime(time)
        .filter(data => data.length > 0)
        .subscribe((data) => {
          this.send(endpoint, type, data);
        });
    }

    let store = this.stores[endpoint][type];

    store.next(data);
  }
}

module.exports = new IPCHelper();
