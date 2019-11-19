'use strict';

var catchErrors      = require('./catchErrors');
var electronApi      = require('./electronApi');
var log              = require('./log');
var transportConsole = require('./transports/console');
var transportFile    = require('./transports/file');
var transportRemote  = require('./transports/remote');
var transportIpc     = require('./transports/ipc');

module.exports = {
  catchErrors: function callCatchErrors(options) {
    var opts = Object.assign({}, {
      log: module.exports.error,
      showDialog: process.type === 'browser'
    }, options || {});

    catchErrors(opts);
  },
  hooks: [],
  isDev: electronApi.isDev(),
  levels: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
  variables: {
    processType: process.type
  }
};

module.exports.transports = {
  console: transportConsole(module.exports),
  file: transportFile(module.exports),
  remote: transportRemote(module.exports),
  ipc: transportIpc(module.exports)
};

module.exports.levels.forEach(function (level) {
  module.exports[level] = log.bind(null, module.exports, level);
});

module.exports.log = log.bind(null, module.exports, 'info');

module.exports.default = module.exports;