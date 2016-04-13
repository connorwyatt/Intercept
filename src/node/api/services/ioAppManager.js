'use strict';

var socketIo = require('socket.io');

class IoAppManager {
  setServer(server) {
    this.io = socketIo(server);
  }

  getIoApp() {
    return this.io;
  }
}

module.exports = new IoAppManager();
