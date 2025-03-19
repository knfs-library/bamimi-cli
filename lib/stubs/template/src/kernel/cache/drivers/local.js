"use strict";
const Cache = require("@knfs-tech/bamimi-cache")
const { drivers } = require("@iConfigs/cache")
const config = drivers.local

/**
 * @typedef {import("@knfs-tech/bamimi-cache")}  Cache
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
		cache = new Cache(config);
		cache.setup();
	}

	return cache
}

/**
 * @returns {Cache}
 */
const newInstance = () => {
	const nI = new Cache(config)
	nI.setup();

	return nI
}


/**
 * @returns {{singleton: Cache, new: Cache}
 */
module.exports = {
	singleton: singleton(),
	new: newInstance()
}