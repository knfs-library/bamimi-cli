"use strict";

const { Auth } = require("@knfs-tech/bamimi-auth");
const configs = require("@iConfigs/auth");

const auth = Auth.init(configs.authenticate);

module.exports = auth;