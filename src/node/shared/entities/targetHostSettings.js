'use strict';

const BaseEntity = require('./baseEntity'),
  targetHostSettingsConstraints = require('../../proxy/validation/targetHostSettingsConstraints');

class TargetHostSettings extends BaseEntity {
  constructor(data) {
    super();
    this.hostname = data.hostname;
    this.port = data.port;
  }

  getConstraints() {
    return targetHostSettingsConstraints;
  }
}

module.exports = TargetHostSettings;
