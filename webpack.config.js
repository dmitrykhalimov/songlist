const path = require('path');

module.exports = {
  mode: 'development',
  entry: './source/js/main.js',
  output: {
    filename: 'news-widget.js',
    path: path.join(__dirname, 'build'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    watchContentBase: true,
    port: 3005
  }
};
