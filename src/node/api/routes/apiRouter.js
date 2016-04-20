'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  rulesRouter = require('./rules/rulesRouter'),
  settingsRouter = require('./settings/settingsRouter');

let apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({ extended: false }));

apiRouter.use('/rules', rulesRouter);
apiRouter.use('/settings', settingsRouter);

module.exports = apiRouter;
