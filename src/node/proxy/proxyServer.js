'use strict';

const settings = require('./services/settings'),
  ProxyService = require('./services/proxyService');

settings.init().then(() => {
  ProxyService.createServer();
  ProxyService.changePort(5000);
});
