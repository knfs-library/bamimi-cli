"use strict";
require("dotenv").config();


module.exports = {
    cors: {
        origin: "*",
        transports: ["websocket", "polling"],
    },
    transports: ["websocket", "polling"],
    use: process.env.USE_SOCKET == "true" ? true : false
};
