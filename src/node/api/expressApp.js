'use strict';

const express = require('express'),
  path = require('path'),
  expressApp = express(),
  apiRouter = require('./routes/apiRouter');

expressApp.disable('x-powered-by');

expressApp.use('/api', apiRouter);

expressApp.use(express.static(process.env.UI_ROOT));

module.exports = expressApp;
