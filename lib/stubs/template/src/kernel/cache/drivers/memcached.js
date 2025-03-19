"use strict";
const Memcached = require("memcached");
const { drivers } = require("@iConfigs/cache")
const config = drivers.memcached

/**
 * @typedef {import("memcached")}  Cache
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
		cache = new Memcached(`${config.host}:${config.port}`, config.options);
	}

	return cache
}

/**
 * @returns {Cache}
 */
const newInstance = () => {
	return new Memcached(`${config.host}:${config.port}`, config.options);
}

/**
 * @returns {{singleton: Cache, new: Cache}
 */
module.exports = {
	singleton: singleton(),
	new: newInstance()
}