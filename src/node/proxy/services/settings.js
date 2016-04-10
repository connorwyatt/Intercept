'use strict';

const DataStore = require('nedb'),
  proxySettingsConstraints = require('./../validation/proxySettingsConstraints'),
  logger = require('../../shared/services/logger'),
  FilenameService = require('../../shared/services/filenameService');

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
              logger.info('Initialising settings');
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

        this.$dataStore.persistence.setAutocompactionInterval(30000);
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
        resolve(settings.targetHost);
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
              targetHost: {
                hostname: targetHostSettings.hostname,
                port: targetHostSettings.port
              }
            }
          },
          { returnUpdatedDocs: true },
          (err, count, settings) => {
            if (err) {
              logger.error(err);
              reject(err);
            } else {
              resolve(settings.targetHost);
            }
          });
      } catch (exception) {
        reject(exception);
      }
    });
  }

  getProxySettings() {
    return new Promise((resolve, reject) => {
      this.$getSettings().then((settings) => {
        resolve(settings.proxy);
      }, (err) => {
        reject(err);
      });
    });
  }

  setProxySettings(proxySettings) {
    return new Promise((resolve, reject) => {
      try {
        proxySettings.validate();

        this.$dataStore.update(
          { _id: Settings.$defaultId },
          { $set: { proxy: { port: proxySettings.port } } },
          { returnUpdatedDocs: true },
          (err, count, settings) => {
            if (err) {
              logger.error(err);
              reject(err);
            } else {
              resolve(settings.proxy);
            }
          });
      } catch (error) {
        reject(error);
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
      this.$dataStore.insert(
        { _id: Settings.$defaultId, proxy: {}, targetHost: {} },
        (err) => {
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
