"use strict";
const config = require("@iConfigs/app");

module.exports = (publicPath = "") => {
    return `${config.asset}/${publicPath}`;
};