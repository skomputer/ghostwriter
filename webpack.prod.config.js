var webpack = require("webpack");

var config = {
  entry: "./src/index.jsx",
  output: {
    path: "./build/js",
    filename: "ghostwriter.js",
    library: "GhostWriter",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env": { 'NODE_ENV': JSON.stringify('production') } })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: ["babel"]
      }
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};

module.exports = config;