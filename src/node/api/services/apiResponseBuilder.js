'use strict';

class APIResponseBuilder {
  constructor(entityConstructor, transferObject, metadata, messages) {
    this.$entityConstructor = entityConstructor;
    this.$transferObject = transferObject;
    this.$metadata = metadata;
    this.$messages = messages;
  }

  get() {
    let response = {};

    if (this.$transferObject) {
      let outerEntity = this.$entityConstructor.name;

      response.data = {};

      if (typeof this.$transferObject.getTransferObject === 'function') {
        response.data[outerEntity] = this.$transferObject.getTransferObject();
      } else {
        response.data[outerEntity] = this.$transferObject;
      }
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
