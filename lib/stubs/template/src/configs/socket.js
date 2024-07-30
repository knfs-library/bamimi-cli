"use strict";
require("dotenv").config();


module.exports = {
    cors: {
        origin: "*",
        transports: ["websocket", "polling"],
    },
    transports: ["websocket", "polling"],
    server: {
        host: process.env.SOCKET_APP_HOST || "localhost",
        port: process.env.SOCKET_APP_PORT || process.env.PORT || 3001,
    },
    onMain: false
};
