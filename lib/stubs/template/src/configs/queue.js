"use strict";
require("dotenv").config();

module.exports = {
    storage: {
        host: process.env.REDIS_QUEUE_HOST || "127.0.0.1",
        port: process.env.REDIS_QUEUE_PORT || 6379,
        username: process.env.REDIS_QUEUE_USER || null,
        password: process.env.REDIS_QUEUE_PASS || null,
        db: process.env.REDIS_QUEUE_DB || "0",
    },
};