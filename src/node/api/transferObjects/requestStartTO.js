'use strict';

class RequestStartTO {
  constructor(request, targetHostname, targetPort) {
    this.id = request.id;
    this.hostname = targetHostname;
    this.port = targetPort;
    this.url = request.url;
    this.method = request.method;
  }
}

module.exports = RequestStartTO;
