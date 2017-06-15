const path = require('path');
const www = path.resolve(__dirname, 'www');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: www
  },
  module: {
    rules: [],
    loaders: [
      { test: /\.json$/, use: 'json-loader' }
    ]
  },
  devServer: {
    contentBase: www
  }
}
