"use strict";
const express = require("express");
const { createServer } = require("node:http");
const config = require("@iConfigs/socket");
const app = express();
const server = createServer(app);
const socket = require("@knfs-tech/bamimi-socket.io");
socket.io(server, config);
require("@iRoutes/socket");

server.listen(config.server.port, () => {
    console.log(`server running at http://localhost:${config.server.port}`);
});

