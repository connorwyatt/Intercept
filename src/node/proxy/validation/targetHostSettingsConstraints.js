'use strict';

const targetHostSettingsConstraints = {
  hostname: {
    presence: true
  },
  port: {
    presence: true,
    numericality: {
      noStrings: true
    }
  }
};

module.exports = targetHostSettingsConstraints;
