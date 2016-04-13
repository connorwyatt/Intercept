'use strict';

const http = require('http'),
  express = require('express'),
  expressApp = require('./expressApp'),
  electronApp = require('../../ui/electron'),
  logger = require('../shared/services/logger'),
  ioAppManager = require('./services/ioAppManager'),
  ioApp = require('./ioApp');

let server = http.createServer(expressApp);

server.listen();
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  logger.error(error);
  throw error;
}

function onListening() {
  let address = server.address();

  logger.info(`API server listening on port ${address.port}`);

  ioAppManager.setServer(server);
  ioApp.start();
  electronApp.startElectronApp(address.port);
}
