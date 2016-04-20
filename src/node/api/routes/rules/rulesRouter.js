'use strict';

const express = require('express'),
  rules = require('../../../proxy/services/rules'),
  APIResponseBuilder = require('../../services/apiResponseBuilder'),
  Rule = require('../../../shared/entities/rule'),
  RuleListTO = require('../../transferObjects/ruleListTO');

let rulesRouter = express.Router();

rulesRouter.route('')

  .get((request, response) => {
    rules.getAllRules()
      .then((rules) => {
        let to = new RuleListTO(rules);

        let apiResponseBuilder = new APIResponseBuilder(Rule, to, null, null);

        response.send(apiResponseBuilder.get());
      }, () => {
        response.status(500).end();
      });
  });

module.exports = rulesRouter;
