'use strict';

const BaseEntity = require('./baseEntity'),
  AutoResponse = require('./autoResponse'),
  ruleConstraints = require('../../proxy/validation/ruleConstraints');

class Rule extends BaseEntity {
  constructor(data) {
    super();
    this.url = data.url;
    this.method = data.method;
    this.autoResponse = new AutoResponse(data.autoResponse);
    this.$constraints = ruleConstraints;
  }
}

module.exports = Rule;
