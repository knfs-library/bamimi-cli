"use strict";

const { Queue, Worker } = require("bullmq");

const { managers } = require("@iConfigs/queue")
const config = managers.bullmq

const connection = {
	host: config.host,
	port: config.port,
	username: config.username,
	password: config.password
}

if ('tls' in config) {
	connection['tls'] = config.tls
}

const queues = {}

const workers = {}

const getQueue = (queueName, options = {}) => {
	if (!queues[queueName]) {
		queues[queueName] = new Queue(queueName, {
			connection: connection,
			defaultJobOptions: config.defaultJobOptions,
			...options
		});
	}
	
	return queues[queueName];
}

/**
 * 
 * @param {String} workerName 
 * @param {function} handleJob 
 * @param {*} options 
 * @returns 
 */
const getWorker = (workerName, handleJob, options = {}) => {
	if (!workers[workerName]) {
		workers[workerName] = new Worker(workerName, handleJob, {
			connection: connection,
			...options
		});
	}
	return workers[workerName];
}

module.exports = {
	getQueue,
	getWorker
}

