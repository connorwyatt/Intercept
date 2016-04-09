'use strict';

const http = require('http');

class Proxy {
  static proxyRequest(request, response) {
    let proxyRequest = http.request({
      hostname: 'localhost', // TODO Make this read from settings
      port: 3000, // TODO Make this read from settings
      path: request.url,
      method: request.method,
      headers: request.headers
    }, (proxyResponse) => {
      Proxy.handleProxyResponse(proxyResponse, response);
    });

    Proxy.mimicRequest(request, proxyRequest);

    proxyRequest.addListener('error', (err) => {
      Proxy.errorHandler(err, response);
    });
  }

  static mimicRequest(request, proxyRequest) {
    request.addListener('data', (chunk) => {
      proxyRequest.write(chunk, 'binary');
    });

    request.addListener('end', () => {
      proxyRequest.end();
    });
  }

  static handleProxyResponse(proxyResponse, response) {
    proxyResponse.addListener('data', (chunk) => {
      response.write(chunk, 'binary');
    });

    proxyResponse.addListener('end', () => {
      response.end();
    });

    response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  }

  static errorHandler(error, response) {
      response.statusCode = 502;
      response.write(`<h1>Interceptor - Error</h1>`);
      response.write(`<p>${error.toString()}</p>`);
      response.end();
  }
}

module.exports = Proxy;
