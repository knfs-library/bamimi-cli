"use strict";

const { Auth } = require("@knfs-tech/bamimi-auth"),
    configs = require("../../configs/auth");

const auth = Auth.init(configs.authenticate);

module.exports = auth;