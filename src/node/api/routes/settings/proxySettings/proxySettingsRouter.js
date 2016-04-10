'use strict';

const express = require('express'),
  settings = require('../../../../proxy/services/settings'),
  APIResponseBuilder = require('../../../services/apiResponseBuilder'),
  ProxySettings = require('../../../../shared/entities/proxySettings'),
  ProxySettingsTO = require('../../../transferObjects/proxySettingsTO');

let proxySettingsRouter = express.Router();

proxySettingsRouter.route('')

  .get((request, response) => {
    settings.getProxySettings().then((settings) => {
      let proxySettings = new ProxySettings(settings);

      let to = new ProxySettingsTO(proxySettings);

      let apiResponseBuilder = new APIResponseBuilder(to, null, null);

      response.send(apiResponseBuilder.get());
    }, () => {
      response.status(500).end();
    });
  });

module.exports = proxySettingsRouter;
