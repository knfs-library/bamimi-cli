"use strict";

/**
 * Initializes queues and workers based on the provided job definitions.
 * @param {Object[]} jobs - An array of job definitions.
 * @param {string} jobs[].queue - The name of the queue to be used for the job.
 * @param {string} jobs[].queueManager - The name of the queue manager (ex: bullMq)
 * @param {string} jobs[].name - The name of the job to be added to the queue.
 * @param {boolean} jobs[].isCronJob - A flag indicating whether the job is a cron job.
 * @param {Object} [jobs[].options={}] - Additional options for the job.
 * @param {Function} jobs[].handle - The job handler function to be used by the worker.
 * @param {Object} queueManager - An instance of the QueueManager class used to manage queues and workers.
 * @returns {Promise<void>} A promise that resolves when all queues and workers have been initialized.
 */
module.exports = async (jobs) => {
	const queuePromises = [];
	const workerPromises = [];

	for (const job of jobs) {
		try {
			switch (job.queueManager) {
				case "bullmq":
					const { queue, worker } = require("./managers/bullmq")(job)
					queuePromises.push(queue),
					workerPromises.push(worker)
					break;
			}
			
		} catch (jobError) {
			throw new Error(`Error at ${job.name}: ${jobError}`)
		}
	}

	await Promise.all(queuePromises);
	await Promise.all(workerPromises);
};
