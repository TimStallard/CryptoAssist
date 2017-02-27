var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "app.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader"
          }
        ]
      }
    ]
  }
}

//SASS code from https://github.com/jtangelder/sass-loader licensed under MIT, see https://github.com/jtangelder/sass-loader/blob/master/LICENSE
