
var frontendConfig = require('./webpack-frontend.config.js');
var backendConfig = require('./webpack-backend.config.js');
var replConfig = require('./webpack-repl.config.js');
var sharedConfig = require('./webpack-shared.config.js');

module.exports = [
  Object.assign({}, sharedConfig, frontendConfig),
  Object.assign({}, sharedConfig, backendConfig),
  Object.assign({}, sharedConfig, replConfig),
];
