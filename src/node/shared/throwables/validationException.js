'use strict';

const ExtendableThrowable = require('./extendableThrowable');

class ValidationException extends ExtendableThrowable {
  constructor(validationErrors) {
    super('There are validation errors.');
    this.$formattedErrors = validationErrors;
  }

  get formattedErrors() {
    return this.$formattedErrors;
  }
}

module.exports = ValidationException;
