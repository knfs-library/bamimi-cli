"use strict";
/**
 * @module File
 */
const config = require("@iConfigs/file");
/**
 * @typedef {import("./services/local")} LocalStorage
 * @typedef {import("./services/s3")} S3Storage
 * @typedef {import("./services/blob")} BlobStorage
 * @typedef {import("./services/gcstorage")} GCStorage
 */

/**
 * @typedef {"local" | "s3" | "blob" | "gcStorage"} StorageKey
 * @typedef {{ local: LocalStorage, s3: S3Storage, blob: BlobStorage, gcStorage: GCStorage }} StorageType
 */

const storages = {
	/** @returns {LocalStorage} */
	local: () => require("./services/local"),
	/** @returns {S3Storage} */
	s3: () => require("./services/s3"),
	/** @returns {BlobStorage} */
	blob: () => require("./services/blob"),
	/** @returns {GCStorage} */
	gcStorage: () => require("./services/gcstorage"),
};

/**
 * get Storage width config.use
 * @param {StorageKey} [use=config.use] - type of storage
 * @returns {StorageType[StorageKey]}
 */
module.exports = (use = config.use) => {
	return storages[use]();
}
