'use strict';

const express = require('express'),
  settings = require('../../../../proxy/services/settings'),
  ProxyService = require('../../../../proxy/services/proxyService'),
  APIResponseBuilder = require('../../../services/apiResponseBuilder'),
  ProxySettings = require('../../../../shared/entities/proxySettings'),
  ProxySettingsTO = require('../../../transferObjects/proxySettingsTO'),
  ValidationException = require('../../../../shared/throwables/validationException');

let proxySettingsRouter = express.Router();

proxySettingsRouter.route('')

  .get((request, response) => {
    settings.getProxySettings().then((settings) => {
      let proxySettings = new ProxySettings(settings);

      let to = new ProxySettingsTO(proxySettings);

      let apiResponseBuilder = new APIResponseBuilder(ProxySettings, to, null, null);

      response.send(apiResponseBuilder.get());
    }, () => {
      response.status(500).end();
    });
  })

  .put((request, response) => {
    let proxySettings = new ProxySettings(request.body);

    settings.setProxySettings(proxySettings).then((settings) => {
      ProxyService.restartProxyServer();

      let proxySettings = new ProxySettings(settings);

      let to = new ProxySettingsTO(proxySettings);

      let apiResponseBuilder = new APIResponseBuilder(ProxySettings, to, null, null);

      response.send(apiResponseBuilder.get());
    }, (err) => {
      if (err instanceof ValidationException) {
        let apiResponseBuilder = new APIResponseBuilder(ProxySettings, null, null, err.formattedErrors);

        response.status(400).send(apiResponseBuilder.get());
      } else {
        response.status(500).end();
      }
    });
  });

module.exports = proxySettingsRouter;
