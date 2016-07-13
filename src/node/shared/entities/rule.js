'use strict';

const BaseEntity = require('./baseEntity'),
  fs = require('fs'),
  logger = require('../services/logger'),
  ruleConstraints = require('../../proxy/validation/ruleConstraints');

class Rule extends BaseEntity {
  constructor(data) {
    super();

    if (data.headers) {
      data.headers = data.headers.reduce((accumulatedHeaders, header) => {
        if (header.key !== null && header.value !== null && header.key !== undefined && header.value !== undefined) {
          accumulatedHeaders.push(header);
        }

        return accumulatedHeaders;
      }, []);
    }

    Object.assign(this, data);
  }

  getConstraints() {
    return ruleConstraints;
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
    let headers = this.headers.reduce((accumulatedHeaders, header) => {
      accumulatedHeaders[header.key] = header.value;

      return accumulatedHeaders;
    }, {});

    if (this.type) {
      headers['Content-Type'] = this.type;
    }

    return headers;
  }

  getStatusCode() {
    return this.statusCode || 200;
  }
}

module.exports = Rule;
