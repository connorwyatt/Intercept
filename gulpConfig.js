'use strict';

const _ = require('lodash');

const buildPrefix = '.builds/';

const defaults = {
  paths: {
    staticFiles: 'src/**/*'
  }
};

const DEVELOPMENT = {
  buildDirectory: `${buildPrefix}dev/`
};

const PRODUCTION = {
  buildDirectory: `${buildPrefix}prod/`
};

module.exports = {
  DEVELOPMENT: _.defaultsDeep(DEVELOPMENT, defaults),
  PRODUCTION: _.defaultsDeep(PRODUCTION, defaults)
};
