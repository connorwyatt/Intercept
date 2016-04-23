'use strict';

const electronApp = require('electron').app,
  path = require('path'),
  DataStore = require('nedb'),
  logger = require('../../shared/services/logger'),
  ResourceNotExistException = require('../../shared/throwables/resourceNotExistException');

class Rules {
  init() {
    return new Promise((resolve, reject) => {
      let userData = electronApp.getPath('userData');

      let filename = path.format({
        dir: userData,
        base: 'rules.db'
      });

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
        } else if (!doc) {
          let error = new ResourceNotExistException();

          reject(error);
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

  updateRuleById(id, rule) {
    return new Promise((resolve, reject) => {
      try {
        this.$dataStore.update({ _id: id }, rule, { returnUpdatedDocs: true }, (err, numUpdated, doc) => {
          if (err) {
            logger.error(err);
            reject(err);
          } else if (!numUpdated) {
            let error = new ResourceNotExistException();

            reject(error);
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
        } else if (!numRemoved) {
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
