var frontendConfig = require('./webpack-frontend.config.js');
var sharedConfig = require('./webpack-shared.config.js');

module.exports = Object.assign({}, sharedConfig, frontendConfig);
