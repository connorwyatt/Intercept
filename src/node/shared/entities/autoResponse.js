'use strict';

const BaseEntity = require('./baseEntity'),
  logger = require('../services/logger'),
  fs = require('fs');

class AutoResponse extends BaseEntity {
  constructor(data) {
    super();
    Object.assign(this, data);
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
}

module.exports = AutoResponse;
