'use strict';

const express = require('express'),
  proxySettingsRouter = require('./proxySettings/proxySettingsRouter'),
  targetHostSettingsRouter = require('./targetHostSettings/targetHostSettingsRouter');

let settingsRouter = express.Router();

settingsRouter.use('/proxy', proxySettingsRouter);
settingsRouter.use('/targetHost', targetHostSettingsRouter);

module.exports = settingsRouter;
