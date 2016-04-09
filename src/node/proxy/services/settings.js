'use strict';

const DataStore = require('nedb'),
  logger = require('../../shared/services/logger'),
  FilenameService = require('../../shared/services/filenameService');

class Settings {
  constructor(DataStore) {
    let filename = FilenameService.changeExtension(__filename, '.db');

    this.$dataStore = new DataStore({
      filename: filename,
      autoload: true
    });

    this.$dataStore.count({}, (err, count) => {
      if (err) {
        logger.error(err);
      } else if (count === 0) {
        logger.info('Initialised persisted settings for proxy');
        this.$dataStore.insert({
          _id: 1
        });
      } else if (count > 1) {
        logger.error(`There are ${count} settings records, the limit is 1`);
      }
    });
  }
}

module.exports = new Settings(DataStore);
