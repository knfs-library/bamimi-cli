"use strict";
const Redis = require("ioredis");
const { drivers } = require("@iConfigs/cache")
const config = drivers.redis

/**
 * @typedef {import("ioredis")}  Cache
 */

/**
 * @type {Cache | null}
 */
let cache = null

/**
 * @returns {Cache}
 */
const singleton = () => {
    if (!cache) {
        cache = new Redis(config);
    }

    return cache
}

/**
 * @returns {Cache}
 */
const newInstance = () => {
    return new Redis(config)
}

/**
 * @returns {{singleton: Cache, new: Cache}
 */
module.exports = {
    singleton: singleton(),
    new: newInstance()
}