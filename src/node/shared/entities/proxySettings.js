'use strict';

const BaseEntity = require('./baseEntity'),
  proxySettingsConstraints = require('../../proxy/validation/proxySettingsConstraints');

class ProxySettings extends BaseEntity {
  constructor(data) {
    super();
    this.port = data.port;
  }

  getConstraints() {
    return proxySettingsConstraints;
  }
}

module.exports = ProxySettings;
