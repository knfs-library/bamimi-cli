"use strict";
const config = require("./../configs/app");

module.exports = (publicPath = "") => {
    return `${config.server.asset}/${publicPath}`;
};