var path = require('path');

module.exports = {
  mode: 'development',
  // devtool: 'inline-source-map',
  devtool: '#eval-source-map',
  resolve: {
    alias: {
      src: path.resolve(__dirname),
    },
  },
};
