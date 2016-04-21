'use strict';

const ExtendableThrowable = require('./extendableThrowable');

class ResourceNotExistException extends ExtendableThrowable {
  constructor() {
    super('The resource does not exist.');
  }
}

module.exports = ResourceNotExistException;
