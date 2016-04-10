'use strict';

const express = require('express'),
  settings = require('../../../../proxy/services/settings'),
  APIResponseBuilder = require('../../../services/apiResponseBuilder'),
  TargetHostSettingsTO = require('../../../transferObjects/targetHostSettingsTO');

let targetHostSettingsRouter = express.Router();

targetHostSettingsRouter.route('')

  .get((request, response) => {
    settings.getTargetHostSettings().then((targetHostSettings) => {
      let to = new TargetHostSettingsTO(targetHostSettings);

      let apiResponseBuilder = new APIResponseBuilder(to, null, null);

      response.send(apiResponseBuilder.get());
    }, () => {
      response.status(500).end();
    });
  });

module.exports = targetHostSettingsRouter;
