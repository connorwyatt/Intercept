'use strict';

class APIResponseBuilder {
  constructor(entityConstructor, transferObject, metadata) {
    this.$entityConstructor = entityConstructor;
    this.$transferObject = transferObject;
    this.$metadata = metadata;
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

    return response;
  }
}

module.exports = APIResponseBuilder;
