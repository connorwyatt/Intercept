'use strict';

const validateJs = require('validate.js'),
  ValidationException = require('../throwables/validationException');

class BaseEntity {
  constructor() {
  }

  validate() {
    if (this.$constraints) {
      let err = validateJs.validate(this, this.$constraints);

      if (err) {
        throw new ValidationException(err);
      }
    }
  }
}

module.exports = BaseEntity;
