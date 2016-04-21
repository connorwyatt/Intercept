'use strict';

const express = require('express'),
  rules = require('../../../proxy/services/rules'),
  APIResponseBuilder = require('../../services/apiResponseBuilder'),
  Rule = require('../../../shared/entities/rule'),
  RuleTO = require('../../transferObjects/ruleTO'),
  RuleListTO = require('../../transferObjects/ruleListTO'),
  ResourceNotExistException = require('../../../shared/throwables/resourceNotExistException');

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
  })

  .post((request, response) => {
    let requestBody = new Rule(request.body);

    rules.createNewRule(requestBody)
      .then((rule) => {
        let to = new RuleTO(rule);

        let apiResponseBuilder = new APIResponseBuilder(Rule, to, null, null);

        response.status(201).send(apiResponseBuilder.get());
      }, () => {
        response.status(500).end();
      });
  });

rulesRouter.route('/:ruleId')

  .get((request, response) => {
    rules.getRuleById(request.params.ruleId)
      .then((rule) => {
        let to = new RuleTO(rule);

        let apiResponseBuilder = new APIResponseBuilder(Rule, to, null, null);

        response.send(apiResponseBuilder.get());
      }, (err) => {
        if (err instanceof ResourceNotExistException) {
          response.status(404).end();
        } else {
          response.status(500).end();
        }
      });
  })

  .delete((request, response) => {
    rules.deleteRuleById(request.params.ruleId)
      .then(() => {
        response.status(204).end();
      }, (err) => {
        if (err instanceof ResourceNotExistException) {
          response.status(404).end();
        } else {
          response.status(500).end();
        }
      });
  });

module.exports = rulesRouter;
