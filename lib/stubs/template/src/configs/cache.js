"use strict";
require("dotenv").config();

module.exports = {
    use: process.env.CACHE_OPTION ?? "redis",
    caches: {
        redis: {
            host: process.env.REDIS_CACHE_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_CACHE_PORT) || 6379,
            username: process.env.REDIS_CACHE_USER || null,
            password: process.env.REDIS_CACHE_PASS || null,
            db: process.env.REDIS_CACHE_DB || "0",
        }
    }
};
