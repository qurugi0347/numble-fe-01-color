const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack"); // to access built-in plugins
const DEV_SERVER_PORT = 4000;
const { NODE_ENV, ENV_FILE } = process.env;
const envPath = path.resolve(process.cwd(), ENV_FILE);
require("dotenv").config({ path: envPath });
console.log("ENV_FILE: ", envPath);
const { SAMPLE_ENV } = process.env;

const inAppEnv = { SAMPLE_ENV };

module.exports = {
  mode: NODE_ENV || "development",
  output: {
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "./"),
    ],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|mp4)$/,
        use: ["file-loader"],
        exclude: /node_modules/,
      },
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
      { test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ },
    ],
  },
  devServer: {
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(inAppEnv),
    }),
  ],
};
