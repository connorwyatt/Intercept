'use strict';

const _ = require('lodash');

const buildPrefix = '.builds/';

const defaults = {
  paths: {
    nodeModulesFiles: 'src/node_modules/**/*',
    staticFiles: 'src/**/!(*.ts)',
    typescriptFiles: 'src/**/@(*.ts)',
    tsConfig: 'src/tsconfig.json'
  }
};

const DEVELOPMENT = {
  paths: {
    buildDirectory: `${buildPrefix}dev/`
  }
};

const PRODUCTION = {
  paths: {
    buildDirectory: `${buildPrefix}prod/`
  }
};

module.exports = {
  DEVELOPMENT: _.defaultsDeep(DEVELOPMENT, defaults),
  PRODUCTION: _.defaultsDeep(PRODUCTION, defaults)
};
