'use strict';

class RequestEndTO {
  constructor(request, response) {
    this.id = request.id;
    this.statusCode = response.statusCode;
    this.latency = new Date() - request.startTimestamp;
  }
}

module.exports = RequestEndTO;
