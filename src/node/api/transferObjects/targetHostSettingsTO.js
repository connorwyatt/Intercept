'use strict';

class TargetHostSettingsTO {
  constructor(targetHostSettings) {
    this.hostname = targetHostSettings.hostname || null;
    this.port = targetHostSettings.port || null;
  }
}

module.exports = TargetHostSettingsTO;
