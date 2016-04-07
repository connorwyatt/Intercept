'use strict';

const http = require('http'),
  express = require('express'),
  expressApp = require('./app'),
  electronApp = require('../ui/electron');

let server = http.createServer(expressApp);

server.listen();
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  throw error;
}

function onListening() {
  let address = server.address();

  console.info(`Listening on port ${address.port}`);

  electronApp.startElectronApp(address.port);
}
