'use strict';

const winston = require('winston'),
  path = require('path');

class Logger {
  constructor(winston) {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.File({
          level: 'info',
          filename: path.join(__dirname, '../../logfile.log'),
          handleExceptions: true,
          json: true,
          maxsize: 5242880,
          colorize: false
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true
        })
      ],
      exitOnError: false
    });
  }

  debug(message) {
    this.logger.debug(message);
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

module.exports = new Logger(winston);
