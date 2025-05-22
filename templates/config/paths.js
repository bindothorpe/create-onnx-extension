"use strict";

const path = require("path");

const PATHS = {
  src: path.resolve(__dirname, "../src"),
  build: path.resolve(__dirname, "../build"),
  background: path.resolve(__dirname, "../src/background"),
  popup: path.resolve(__dirname, "../src/popup"),
  model: path.resolve(__dirname, "../src/model"),
};

module.exports = PATHS;