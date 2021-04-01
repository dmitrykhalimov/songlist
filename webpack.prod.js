const path = require('path');

module.exports = {
  mode: 'production',
  entry: './source/js/main.js',
  output: {
    filename: 'news-widget.js',
    path: path.join(__dirname, 'build'),
  },
};
