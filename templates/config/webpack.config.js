"use strict";

const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const PATHS = require("./paths");

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      "background": PATHS.src + "/background/index.js",
      "popup": PATHS.src + "/popup/index.js",
      "model-loader": PATHS.src + "/model/loader.js",
    },
    output: {
      filename: "[name].js",
      path: PATHS.build,
    },
    devtool: argv.mode === "production" ? false : "source-map",
  });

module.exports = config;