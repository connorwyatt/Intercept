'use strict';

const BaseEntity = require('./baseEntity'),
  proxySettingsConstraints = require('../../proxy/validation/proxySettingsConstraints');

class ProxySettings extends BaseEntity {
  constructor(data) {
    super();
    this.port = data.port;
    this.$constraints = proxySettingsConstraints;
  }
}

module.exports = ProxySettings;
