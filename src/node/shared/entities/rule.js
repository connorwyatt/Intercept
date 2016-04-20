'use strict';

const BaseEntity = require('./baseEntity');

class Rule extends BaseEntity {
  constructor(request, response) {
    super();
    this.$request = request;
    this.$response = response;
  }
}

module.exports = Rule;
