'use strict';

const DataStore = require('nedb'),
  validateJs = require('validate.js'),
  proxySettingsConstraints = require('./../validation/proxySettingsConstraints'),
  logger = require('../../shared/services/logger'),
  FilenameService = require('../../shared/services/filenameService'),
  TargetHostSettings = require('../../shared/entities/targetHostSettings');

class Settings {
  static get $defaultId() {
    return '$SETTINGS';
  }

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
          this.$dataStore.find({}, (err, docs) => {
            if (err) {
              logger.error(err);
              reject(err);
            } else if (docs.length === 0) {
              this.insertDefaultRecord().then(() => {
                resolve();
              }, (err) => {
                reject(err);
              });
            } else if (docs.length > 1) {
              logger.warn(`Only 1 settings record is allowed, ${docs.length} were found. Resetting settings`);
              this.resetSettings().then(() => {
                resolve();
              }, (err) => {
                reject(err);
              });
            } else {
              if (docs[0]._id === Settings.$defaultId) {
                resolve();
              } else {
                logger.warn(`There is already a settings record with an incorrect ID: ${docs[0]._id}, only one is allowed. Resetting settings`);
                this.resetSettings().then(() => {
                  resolve();
                }, (err) => {
                  reject(err);
                });
              }
            }
          });
        }

        this.$dataStore.persistence.setAutocompactionInterval(1000);
      });
    });
  }

  $getSettings() {
    return new Promise((resolve, reject) => {
      this.$dataStore.findOne({ _id: Settings.$defaultId }, (err, doc) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  getTargetHostSettings() {
    return new Promise((resolve, reject) => {
      this.$getSettings().then((settings) => {
        resolve({
          hostname: settings.targetHostname,
          port: settings.targetPort
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  setTargetHostSettings(targetHostSettings) {
    return new Promise((resolve, reject) => {
      try {
        targetHostSettings.validate();

        this.$dataStore.update(
          { _id: Settings.$defaultId },
          {
            $set: {
              targetHostname: targetHostSettings.hostname,
              targetPort: targetHostSettings.port
            }
          },
          { returnUpdatedDocs: true },
          (err, count, doc) => {
            if (err) {
              logger.error(err);
              reject(err);
            } else {
              resolve({
                hostname: doc.targetHostname,
                port: doc.targetPort
              });
            }
          });
      } catch (exception) {
        reject(exception);
      }
    });
  }

  getProxyPort() {
    return new Promise((resolve, reject) => {
      this.$getSettings().then((settings) => {
        resolve(settings.proxyPort);
      }, (err) => {
        reject(err);
      });
    });
  }

  setProxyPort(port) {
    return new Promise((resolve, reject) => {
      let errors = validateJs.single(port, proxySettingsConstraints.proxyPort);

      if (errors) {
        reject(errors);
      } else {
        this.$dataStore.update(
          { _id: Settings.$defaultId },
          { $set: { proxyPort: port } },
          { returnUpdatedDocs: true },
          (err, count, doc) => {
            if (err) {
              logger.error(err);
              reject(err);
            } else {
              resolve(doc.proxyPort);
            }
          });
      }
    });
  }

  resetSettings() {
    return new Promise((resolve, reject) => {
      this.$dataStore.remove({}, { multi: true }, (err) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          this.insertDefaultRecord().then(() => {
            resolve();
          }, (err) => {
            reject(err);
          });
        }
      });
    });
  }

  insertDefaultRecord() {
    return new Promise((resolve, reject) => {
      this.$dataStore.insert({ _id: Settings.$defaultId }, (err) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = new Settings();
