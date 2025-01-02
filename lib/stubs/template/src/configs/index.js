"use strict";
require("dotenv").config();
const app = require("./app");
const log = require("./log");
const socket = require("./socket");
const auth = require("./auth");

module.exports = {
    app: app,
    log: log,
    socket: socket,
    auth: auth
};
