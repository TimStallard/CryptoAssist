var config = require("./base.conf.js");
var webpack = require("webpack");
config.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
      {
      loader: "babel-loader",
      query: {
        presets: ["es2015"]
      }
    }
  ]
});
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
module.exports = config;
