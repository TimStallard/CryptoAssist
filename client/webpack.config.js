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
  ]
}
