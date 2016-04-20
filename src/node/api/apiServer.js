'use strict';

const http = require('http'),
  express = require('express'),
  expressApp = require('./expressApp'),
  logger = require('../shared/services/logger'),
  ioAppManager = require('./services/ioAppManager'),
  ioApp = require('./ioApp');

let server = http.createServer(expressApp);

let port;

if (process.env.NO_ELECTRON == 'true') {
  port = 6060;
}

server.listen(port);
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

  if (process.env.NO_ELECTRON !== 'true') {
    require('../../ui/electron').startElectronApp(address.port);
  }
}
