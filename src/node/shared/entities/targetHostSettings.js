'use strict';

const BaseEntity = require('./baseEntity');

class TargetHostSettings extends BaseEntity {
  constructor(data) {
    super();
    this.hostname = data.hostname;
    this.port = data.port;
  }
}

module.exports = TargetHostSettings;
