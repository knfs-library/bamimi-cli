"use strict";
const jobConfig = require("@iConfigs/job")
const runJob = require("./handle")

module.exports = async () => {
	const runJobs = []
	for (const job of jobConfig) {
		if (job.onMain) {
			runJobs.push(job.func)
		}
	}
	await runJob(runJobs)
}