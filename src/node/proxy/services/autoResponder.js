'use strict';

const rules = require('./rules'),
  Rule = require('../../shared/entities/rule');

class AutoResponder {
  getMatchingRule(request) {
    return new Promise((resolve, reject) => {
      rules.getMatchingRule(request)
        .then((rule) => {
          if (rule) {
            resolve(new Rule(rule));
          } else {
            resolve(null);
          }
        }, () => {
          reject();
        });
    });
  }

  respond(rule, response) {
    rule.autoResponse.getBody().then((body) => {
      response.write(body);
      response.end();
    });
  }
}

module.exports = new AutoResponder();
