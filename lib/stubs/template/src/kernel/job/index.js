"use strict";
const { Command } = require("commander");
const runCommand = new Command();
const { job: runJob } = require("@knfs-tech/bamimi-schedule");
const jobs = require("@iConfigs/job");
const queueManager = require("@iKernel/queue");

runCommand
	.name("job")
	.command("ls")
	.description("List the job")
	.action(async () => {
		const listJobs = jobs.map(job => {
			return {
				name: job.name,
				onMain: job.onMain
			}
		})
		console.table(listJobs)
	});

runCommand
	.command("run [jobNames...]")
	.description("Run specified jobs or all jobs if none are specified")
	.action(async (jobNames = [],) => {
		const runJobs = []
		jobNames.forEach((jobName) => {
			const job = jobs.find((ele) => ele.name === jobName)
			if (!job) {
				throw new Error(`Job ${jobName} not found!`);
			}
			if (job.onMain) {
				throw new Error(`Job ${jobName} run on main process`);
			}
			runJobs.push(job.func)
		});

		await runJob(runJobs, queueManager)
	});

runCommand
	.command("run-all")
	.description("Run all job")
	.action(async () => {
		const runJobs = []
		for (const job of jobs) {
			if (!job.onMain) {
				runJobs.push(job.func)
			}
		}
		console.info("START JOB")
		await runJob(runJobs, queueManager)
	});

module.exports = runCommand;
