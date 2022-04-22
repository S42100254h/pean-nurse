const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "PeAN",
      template: "./public/index.html",
      favicons: "./src/assets/img/favicon.ico",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "http://localhost:3001",
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 3001,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|ico)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "img",
        },
      },
    ],
  },
};
