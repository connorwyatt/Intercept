'use strict';

const RuleTO = require('./ruleTO');

class RuleListTO {
  constructor(rules) {
    this.$transferObject = rules.map(rule => {
      return new RuleTO(rule);
    });
  }

  getTransferObject() {
    return this.$transferObject;
  }
}

module.exports = RuleListTO;
