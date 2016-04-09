var webpack = require("webpack");

var config = {
  entry: {
    app: [
      "webpack/hot/dev-server",
      "./src/index.jsx",
    ],
  },
  output: {
    filename: "ghostwriter.js",
    publicPath: "http://localhost:8090/js/",
    library: "GhostWriter",
    libraryTarget: "umd"
  },
  devtool: "eval",
  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: ["react-hot", "babel"]
      }
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};

module.exports = config;