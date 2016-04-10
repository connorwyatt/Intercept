'use strict';

class ProxySettingsTO {
  constructor(proxySettings) {
    this.$outerEntity = proxySettings.constructor.name;
    this.port = proxySettings.port || null;
  }
}

module.exports = ProxySettingsTO;
