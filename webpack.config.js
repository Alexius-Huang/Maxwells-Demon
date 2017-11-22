var path = require('path');
var webpack = require('webpack');
    
module.exports = {
  entry: './lib/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        },
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};