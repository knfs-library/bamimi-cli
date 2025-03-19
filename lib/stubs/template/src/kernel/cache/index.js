"use strict";
const config = require("@iConfigs/cache")

/**
 * @typedef {import("./drivers/local")} LocalCache
 * @typedef {import("./drivers/redis")} RedisCache
 * @typedef {import("./drivers/memcached")} MemCachedCache
 */

/**
 * @typedef {"redis" | "local", "memcached" } CacheKey
 * @typedef {{ local: LocalCache, redis: RedisCache, memcached: MemCachedCache  }} CacheType
 */

const drivers = {
    /** @returns {RedisCache} */
    redis: () => require("./drivers/redis"),
    /** @returns {LocalCache} */
    local: () => require("./drivers/local"),
    /** @returns {MemCachedCache} */
    memcached: () => require("./drivers/memcached"),
}

/**
 * Get Cache Driver
 * 
 * @param {CacheType} [use=config.use]
 * @returns {CacheType[CacheKey]}
 * 
 * @example
 * // User default
 * 
 * const cacheStorage = getDriver();
 * 
 * @example
 * // Get local
 * const cacheLocalStorage = getDriver("local");
 *  
 */
module.exports = (use = config.use) => {
    return drivers[use]();
}
