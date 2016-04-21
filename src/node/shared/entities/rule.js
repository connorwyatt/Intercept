'use strict';

const BaseEntity = require('./baseEntity'),
  fs = require('fs'),
  logger = require('../services/logger'),
  ruleConstraints = require('../../proxy/validation/ruleConstraints');

class Rule extends BaseEntity {
  constructor(data) {
    super();
    Object.assign(this, data);
    this.$constraints = ruleConstraints;
  }

  getBody() {
    return new Promise((resolve, reject) => {
      if (this.body) {
        resolve(this.body);
      } else if (this.file) {
        fs.readFile(this.file, 'UTF8', (err, file) => {
          if (err) {
            logger.error(err);
            reject(err);
          } else {
            resolve(file);
          }
        });
      }
    });
  }

  getLatency() {
    return this.latency || 0;
  }

  getHeaders() {
    let headers = Object.assign({}, this.headers);

    if (this.type) {
      headers['Content-Type'] = this.type;
    }

    return headers;
  }
}

module.exports = Rule;
