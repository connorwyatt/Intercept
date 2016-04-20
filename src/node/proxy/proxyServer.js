'use strict';

const settings = require('./services/settings'),
  rules = require('./services/rules'),
  ProxyService = require('./services/proxyService');

let settingsPromise = settings.init(),
  rulesPromise = rules.init();

Promise.all([settingsPromise, rulesPromise]).then(() => {
  ProxyService.createServer();
});
