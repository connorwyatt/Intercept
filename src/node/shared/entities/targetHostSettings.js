'use strict';

const BaseEntity = require('./baseEntity'),
  targetHostSettingsConstraints = require('../../proxy/validation/targetHostSettingsConstraints');

class TargetHostSettings extends BaseEntity {
  constructor(data) {
    super();
    this.hostname = data.hostname;
    this.port = data.port;
    this.$constraints = targetHostSettingsConstraints;
  }
}

module.exports = TargetHostSettings;
