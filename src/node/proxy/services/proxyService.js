'use strict';

const http = require('http'),
  crypto = require('crypto'),
  settings = require('./settings'),
  logger = require('../../shared/services/logger'),
  ioAppManager = require('../../api/services/ioAppManager'),
  RequestStartTO = require('../../api/transferObjects/requestStartTO'),
  RequestEndTO = require('../../api/transferObjects/requestEndTO');

class ProxyService {
  static proxyRequest(request, response) {
    settings.getTargetHostSettings().then((targetHostSettings) => {
      if (targetHostSettings.hostname && targetHostSettings.port) {
        request.startTimestamp = new Date();

        request.id = crypto.randomBytes(20).toString('hex');

        let requestStartTO = new RequestStartTO(request, targetHostSettings.hostname, targetHostSettings.port);

        ioAppManager.getIoApp().of('/requests').emit('requestStart', JSON.stringify(requestStartTO));

        let proxyRequest = http.request({
          hostname: targetHostSettings.hostname,
          port: targetHostSettings.port,
          path: request.url,
          method: request.method,
          headers: request.headers
        }, (proxyResponse) => {
          ProxyService.$handleProxyResponse(request, proxyResponse, response);
        });

        ProxyService.$mimicRequest(request, proxyRequest);

        proxyRequest.addListener('error', (err) => {
          ProxyService.$errorHandler(err, response);
        });
      } else {
        ProxyService.$errorHandler('The hostname and port number have not been configured. Please configure them before attempting to access the proxy server.', response);
      }
    });
  }

  static $mimicRequest(request, proxyRequest) {
    request.addListener('data', (chunk) => {
      proxyRequest.write(chunk, 'binary');
    });

    request.addListener('end', () => {
      proxyRequest.end();
    });
  }

  static $handleProxyResponse(request, proxyResponse, response) {
    proxyResponse.addListener('data', (chunk) => {
      response.write(chunk, 'binary');
    });

    proxyResponse.addListener('end', () => {
      response.end();

      let requestEndTO = new RequestEndTO(request, response);

      ioAppManager.getIoApp().of('/requests').emit('requestEnd', JSON.stringify(requestEndTO));
    });

    response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  }

  static $errorHandler(error, response) {
    response.statusCode = 502;
    response.write(`<h1>Interceptor - Error</h1>`);
    response.write(`<p>${error.toString()}</p>`);
    response.end();
  }

  static createServer() {
    settings.getProxySettings().then((proxySettings) => {
      if (proxySettings.port) {
        ProxyService.server = http.Server(function(request, response) {
          ProxyService.proxyRequest(request, response);
        });

        ProxyService.server.listen(proxySettings.port);

        ProxyService.server.on('error', (error) => {
          logger.error(error);
        });

        ProxyService.server.on('close', () => {
          logger.info('Proxy server that was scheduled for close has been closed');
        });

        ProxyService.server.on('listening', () => {
          let address = ProxyService.server.address();

          logger.info(`Proxy server listening on port ${address.port}`);
        });
      }
    });
  }

  static $destroyServer() {
    ProxyService.server.close();
    logger.info('Proxy server has been scheduled for close');
  }

  static restartProxyServer() {
    if (ProxyService.server) {
      ProxyService.$destroyServer();
    }
    ProxyService.createServer();
  }
}

module.exports = ProxyService;
