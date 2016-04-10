'use strict';

class APIResponseBuilder {
  constructor(transferObject, metadata, messages) {
    this.$transferObject = transferObject;
    this.$metadata = metadata;
    this.$messages = messages;
  }

  get() {
    let response = {};

    if (this.$transferObject) {
      let outerEntity = this.$transferObject.$outerEntity;

      delete this.$transferObject.$outerEntity;

      response.data = {};
      response.data[outerEntity] = this.$transferObject;
    }

    if (this.$metadata) {
      response.meta = this.$metadata;
    }

    if (this.$messages) {
      response.msg = this.$messages;
    }

    return response;
  }
}

module.exports = APIResponseBuilder;
