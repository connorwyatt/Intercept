'use strict';

const express = require('express'),
  targetHostSettingsRouter = require('./targetHostSettings/targetHostSettingsRouter');

let settingsRouter = express.Router();

settingsRouter.use('/targetHost', targetHostSettingsRouter);

module.exports = settingsRouter;
