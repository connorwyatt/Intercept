'use strict';

const settingsConstraints = {
  proxyPort: {
    presence: true,
    numericality: {
      noStrings: true
    }
  }
};

module.exports = settingsConstraints;
