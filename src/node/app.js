'use strict';

const express = require('express'),
  path = require('path'),
  expressApp = express();

let uiAppLocation = path.join(__dirname, '../ui');

expressApp.use(express.static(uiAppLocation));

module.exports = expressApp;
