const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    pageIndex: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: "/node_modules/" },
      { test: /\.jsx$/, loader: "babel-loader", exclude: "/node_modules/" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["pageIndex"],
    }),

    new webpack.DefinePlugin({
      "process.env.BACKEND_URL": JSON.stringify("api"),
    }),
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3006",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
