'use strict';

const path = require('path');

process.env.NODE_ROOT = path.join(__dirname, '/node/');
process.env.UI_ROOT = path.join(__dirname, '/ui/');

require('./node/proxy/proxyServer');
require('./node/api/apiServer');
