'use strict';

const ioAppManager = require('./services/ioAppManager');

class IoApp {
  start() {
    let ioApp = ioAppManager.getIoApp();
  }
}

module.exports = new IoApp();
