'use strict';

const DataStore = require('nedb'),
  logger = require('../../shared/services/logger'),
  FilenameService = require('../../shared/services/filenameService'),
  ResourceNotExistException = require('../../shared/throwables/resourceNotExistException');

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
          resolve();
        }

        this.$dataStore.persistence.setAutocompactionInterval(30000);
      });
    });
  }

  getRuleById(id) {
    return new Promise((resolve, reject) => {
      this.$dataStore.findOne({ _id: id }, (err, doc) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(doc);
        }
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

  deleteRuleById(id) {
    return new Promise((resolve, reject) => {
      this.$dataStore.remove({ _id: id }, (err, numRemoved) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else if(!numRemoved) {
          let error = new ResourceNotExistException();

          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = new Rules();
