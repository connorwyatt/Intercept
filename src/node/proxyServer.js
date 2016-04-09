'use strict';

const http = require('http'),
  logger = require('./services/logger'),
  Proxy = require('./services/proxy');

let server = http.createServer(Proxy.proxyRequest);

server.listen(5000); // TODO Make this read from settings
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  logger.error(error);
  throw error;
}

function onListening() {
  let address = server.address();

  logger.info(`Proxy server listening on port ${address.port}`);
}
