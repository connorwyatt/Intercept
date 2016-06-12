'use strict';

const _ = require('lodash'),
  packageInfo = require('./package.json');

const buildPrefix = '.builds/';

const defaults = {
  paths: {
    iconLocation: 'icons/logo',
    releasesDirectory: 'releases/',
    nodeNodeModulesFiles: 'src/@(node)/node_modules/**/*',
    uiNodeModulesFiles: 'src/@(ui)/node_modules/**/*',
    scssFiles: 'src/@(ui)/app/**/@(*.scss)',
    binaryFiles: 'src/**/@(*.woff2)',
    staticFiles: 'src/**/!(*.ts|*.scss)',
    typescriptFiles: 'src/@(ui)/app/**/@(*.ts)',
    tsConfig: 'src/ui/tsconfig.json'
  },
  versions: {
    electron: packageInfo.dependencies['electron-prebuilt']
  }
};

const DEVELOPMENT = {
  paths: {
    buildDirectory: `${buildPrefix}dev/`
  },
  removeCode: {
    development: true
  }
};

const PRODUCTION = {
  paths: {
    buildDirectory: `${buildPrefix}prod/`
  },
  removeCode: {
    production: true
  }
};

module.exports = {
  DEVELOPMENT: _.defaultsDeep(DEVELOPMENT, defaults),
  PRODUCTION: _.defaultsDeep(PRODUCTION, defaults)
};
