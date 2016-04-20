'use strict';

class ProxySettingsTO {
  constructor(proxySettings) {
    this.port = proxySettings.port || null;
  }
}

module.exports = ProxySettingsTO;
