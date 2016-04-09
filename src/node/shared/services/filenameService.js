'use strict';

const path = require('path');

class FilenameService {
  static changeExtension(filename, newExtension) {
    let parsedPath = path.parse(filename);

    newExtension = newExtension[0] !== '.' ? '.' + newExtension : newExtension;

    return parsedPath.dir + path.sep + parsedPath.name + newExtension;
  }
}

module.exports = FilenameService;
