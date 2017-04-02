const webpack = require('webpack');
const path = require('path');
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {

  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/static/js'),
    filename: 'app.js',
  },

  module: {

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
           NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ],

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      },
    }],
  },

  devServer: {
    contentBase: path.join(__dirname, "static"),
    proxy: {
      '/api': {
        target: 'https://likeuser.com',
        secure: false
      }
    }
  }
};
