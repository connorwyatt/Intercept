'use strict';

const express = require('express'),
  settings = require('../../../../proxy/services/settings');

let targetConfigRouter = express.Router();

targetConfigRouter.route('')

  .get((request, response) => {
    settings.getTargetHostSettings().then((targetHostConfig) => {
      response.send(targetHostConfig);
    }, () => {
      response.status(500).end();
    });
  });

module.exports = targetConfigRouter;
