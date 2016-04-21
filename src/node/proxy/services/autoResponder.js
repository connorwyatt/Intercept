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
    let bodyPromise = rule.getBody(),
      latencyPromise = this.getLatencyPromise(rule.getLatency());

    response.statusCode = rule.getStatusCode();

    this.setHeaders(rule, response);

    Promise.all([bodyPromise, latencyPromise]).then((data) => {
      response.write(data[0]);
      response.end();
    });
  }

  getLatencyPromise(latency) {
    return new Promise((resolve) => {
      setTimeout(resolve, latency);
    });
  }

  setHeaders(rule, response) {
    let headers = rule.getHeaders(),
      headerNames = Object.keys(headers);

    headerNames.forEach((header) => {
      response.setHeader(header, headers[header]);
    });
  }
}

module.exports = new AutoResponder();
