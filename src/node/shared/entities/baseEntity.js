'use strict';

const validateJs = require('validate.js'),
  ValidationException = require('../throwables/validationException');

class BaseEntity {
  constructor() {
  }

  validate() {
    let constraints = this.getConstraints();

    if (constraints) {
      let err = validateJs.validate(this, constraints);

      if (err) {
        throw new ValidationException(err);
      }
    }
  }
}

module.exports = BaseEntity;
