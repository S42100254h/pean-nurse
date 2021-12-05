const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "PeAN",
      template: "./public/index.html",
      favicons: "./src/assets/img/favicon.ico",
    }),
    new WebpackPwaManifest({
      short_name: "PeAN",
      name: "PeAN",
      display: "standalone",
      start_url: "index.html",
    }),
    new InterpolateHtmlPlugin({
      "PUBLIC_URL": "http://localhost:3000/",
    }),
    new FaviconsWebpackPlugin("./src/assets/img/favicon.ico"),
    new Dotenv(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
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
