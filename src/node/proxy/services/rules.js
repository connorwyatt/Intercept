'use strict';

const DataStore = require('nedb'),
  logger = require('../../shared/services/logger'),
  FilenameService = require('../../shared/services/filenameService');

class Rules {
  init() {
    return new Promise((resolve, reject) => {
      let filename = FilenameService.changeExtension(__filename, '.db');

      this.$dataStore = new DataStore({
        filename: filename,
        timestampData: true
      });

      this.$dataStore.loadDatabase((err) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          this.$dataStore.insert({ url: '/test', method: 'GET', latency: 1274, file: '/Users/wyattc/performance.json', type: 'application/json' });
          resolve();
        }

        this.$dataStore.persistence.setAutocompactionInterval(30000);
      });
    });
  }

  getMatchingRule(request) {
    return new Promise((resolve, reject) => {
      this.$dataStore.findOne({ url: request.url }, (err, doc) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  getAllRules() {
    return new Promise((resolve, reject) => {
      this.$dataStore.find({}, (err, docs) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  createNewRule(rule) {
    return new Promise((resolve, reject) => {
      try {
        rule.validate();

        this.$dataStore.insert(rule, (err, doc) => {
          if (err) {
            logger.error(err);
            reject(err);
          } else {
            resolve(doc);
          }
        });
      } catch (exception) {
        reject(exception);
      }
    });
  }
}

module.exports = new Rules();
