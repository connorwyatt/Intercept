'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  settingsRouter = require('./settings/settingsRouter');

let apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({ extended: false }));

apiRouter.use('/settings', settingsRouter);

module.exports = apiRouter;
