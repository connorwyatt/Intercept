'use strict';

class ApplicationErrorCodes {
  constructor() {
    this.codes = {
      VALIDATION: {
        code: 7000,
        title: 'Validation Error'
      }
    };
  }

  getCode(type) {
    return this.codes[type];
  }
}

module.exports = new ApplicationErrorCodes();
