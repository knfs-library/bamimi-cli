"use strict";
require("dotenv").config();
const path = require("path");

module.exports = {
    use: process.env.QUEUE_SERVICE || 'bullmq',
    managers: {
        bullmq: {
            host: process.env.REDIS_QUEUE_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_QUEUE_PORT) || 6379,
            username: process.env.REDIS_QUEUE_USER || null,
            password: process.env.REDIS_QUEUE_PASS || null,
            db: process.env.REDIS_QUEUE_DB || "0",
            tls: process.env.REDIS_QUEUE_TLS || null,
            defaultJobOptions: {
                removeOnComplete: true,
                removeOnFail: false,
            }
        },
    },
};