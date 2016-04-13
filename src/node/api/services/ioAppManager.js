'use strict';

var socketIo = require('socket.io'),
  logger = require('../../shared/services/logger');

class IoAppManager {
  setServer(server) {
    this.io = socketIo(server);

    this.initialiseNamespaces();

    this.io.on('connection', (socket) => {
      logger.info(`New websocket connection: ${socket.id}`);
    });
  }

  getIoApp() {
    return this.io;
  }

  initialiseNamespaces() {
    this.io.of('/requests');
  }
}

module.exports = new IoAppManager();
