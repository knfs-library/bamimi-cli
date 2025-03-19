"use strict";
/**
 * @module File
 */
const config = require("@iConfigs/queue");
/**
 * @typedef {import("./managers/bullmq")} BullMQType
 */

/**
 * @typedef {"bbq" | "bullmq"} QueueKey
 * @typedef {{ bbq: BBQType, bullmq: BullMQType }} QueueType
 */

const queueManagers = {
	/** @returns {BullMQType} */
	bullmq: () => require("./managers/bullmq"),
};

/**
 * get Storage width config.use
 * @param {QueueKey} [use=config.use] - type of storage
 * @returns {QueueType[QueueKey]}
 */
module.exports = (use = config.use) => {
	return queueManagers[use]();
}