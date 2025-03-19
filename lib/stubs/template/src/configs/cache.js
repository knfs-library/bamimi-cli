"use strict";
require("dotenv").config();

const path = require("path");

module.exports = {
    use: process.env.CACHE_DRIVER || "local",  // Default cache driver
    drivers: {
        /**
         * Bamimi cache configuration.
         * Stores cached data locally on the server's disk.
         * Learn more at:
         * @link [https://www.npmjs.com/package/@knfs-tech/bamimi-cache]
         */
        local: {
            folder: path.join(__dirname, '../../storage/cache'), // Directory for storing cache files
            expire: 0, // Cache expiration time in seconds (0 means no expiration)
            autoCompress: false, // Whether to compress cache files automatically
            log: false, // Enable logging for cache operations
            peakDuration: 2000, // Maximum duration for cache peak
            maxSize: 0, // Maximum size for cache (0 means no size limit)
        },
        /**
         * Redis cache configuration.
         * Stores cached data using Redis.
         * Learn more at:
         * @link [https://www.npmjs.com/package/ioredis]
         */
        redis: {
            host: process.env.REDIS_CACHE_HOST || "127.0.0.1", // Redis server host
            port: Number(process.env.REDIS_CACHE_PORT) || 6379, // Redis server port
            username: process.env.REDIS_CACHE_USER || null, // Redis username (if any)
            password: process.env.REDIS_CACHE_PASS || null, // Redis password (if any)
            db: process.env.REDIS_CACHE_DB || "0", // Redis database number
            tls: process.env.REDIS_CACHE_TLS || null, // Redis TLS options (if any)
        },
        /**
         * Memcached cache configuration.
         * Stores cached data using Memcached.
         * Learn more at:
         * @link [https://www.npmjs.com/package/memcached]
         */
        memcached: {
            host: process.env.MEMCACHED_CACHE_HOST || "127.0.0.1", // Memcached server host
            port: Number(process.env.MEMCACHED_CACHE_PORT) || 11211, // Memcached server port
            options: {
                poolSize: 10, // The number of connections to the Memcached server
                retries: 3, // Number of retries in case of failure
                retry: 5000, // Time (in ms) between retries
                remove: true, // Whether to remove expired cache items automatically
                timeout: 5000, // Timeout (in ms) for each cache operation
                idle: 10000, // Time (in ms) for idle connections to stay open
            },
        },
    }
};
