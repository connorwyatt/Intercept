'use strict';

const express = require('express'),
  settings = require('../../../../proxy/services/settings'),
  APIResponseBuilder = require('../../../services/apiResponseBuilder'),
  TargetHostSettings = require('../../../../shared/entities/targetHostSettings'),
  TargetHostSettingsTO = require('../../../transferObjects/targetHostSettingsTO'),
  ValidationException = require('../../../../shared/throwables/validationException');

let targetHostSettingsRouter = express.Router();

targetHostSettingsRouter.route('')

  .get((request, response) => {
    settings.getTargetHostSettings().then((settings) => {
      let targetHostSettings = new TargetHostSettings(settings);

      let to = new TargetHostSettingsTO(targetHostSettings);

      let apiResponseBuilder = new APIResponseBuilder(to, null, null);

      response.send(apiResponseBuilder.get());
    }, () => {
      response.status(500).end();
    });
  })

  .put((request, response) => {
    let requestBody = new TargetHostSettings(request.body);

    settings.setTargetHostSettings(requestBody).then((settings) => {
      let targetHostSettings = new TargetHostSettings(settings);

      let to = new TargetHostSettingsTO(targetHostSettings);

      let apiResponseBuilder = new APIResponseBuilder(to, null, null);

      response.send(apiResponseBuilder.get());
    }, (err) => {
      if (err instanceof ValidationException) {
        let apiResponseBuilder = new APIResponseBuilder(null, null, err.formattedErrors);

        response.status(400).send(apiResponseBuilder.get());
      } else {
        response.status(500).end();
      }
    });
  });

module.exports = targetHostSettingsRouter;
