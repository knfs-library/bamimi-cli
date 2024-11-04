"use strict";
const jobConfig = require("../../configs/job")
const { job: runJob } = require("@knfs-tech/bamimi-schedule");
const queueManager = require("./../queue");

module.exports = async () => {
	const runJobs = []
	for (const job of jobConfig) {
		if (job.onMain) {
			runJobs.push(job.func)
		}
	}
	await runJob(runJobs, queueManager)
}