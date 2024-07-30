"use strict";
require("dotenv").config();
const app = require("./app.js");
const log = require("./log.js");
const socket = require("./socket.js");
const auth = require("./auth.js");

module.exports = {
    app: app,
    log: log,
    socket: socket,
    auth: auth
};
