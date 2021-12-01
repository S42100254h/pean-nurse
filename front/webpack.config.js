const path = require("path");
module.exports = {
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
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
        loader: "css-loader",
      },
    ],
  },
};
