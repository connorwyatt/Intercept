'use strict';

class ExtendableThrowable extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.stack = (new Error(message)).stack;
  }
}

module.exports = ExtendableThrowable;
