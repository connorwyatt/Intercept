'use strict';

const proxySettingsConstraints = {
  port: {
    presence: true,
    numericality: {
      noStrings: true
    }
  }
};

module.exports = proxySettingsConstraints;
