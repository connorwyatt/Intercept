'use strict';

class RuleTO {
  constructor(rule) {
    this.id = rule._id || null;
    this.url = rule.url || null;
    this.method = rule.method || null;
    this.statusCode = rule.statusCode || null;
    this.body = rule.body || null;
    this.file = rule.file || null;
    this.type = rule.type || null;
    this.latency = rule.latency || null;
  }
}

module.exports = RuleTO;
