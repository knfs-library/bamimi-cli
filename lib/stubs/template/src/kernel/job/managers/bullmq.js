const queueManager = require("@iKernel/queue/managers/bullmq")

module.exports = async (job) => {
	try {
		console.info(`On Job: ${job.name}`)
		const queue = queueManager.getQueue(job.queue);

		if (job.schedules && job.schedules.length > 0) {
			for (const schedule of job.schedules) {
				try {
					console.info(`Set schedule: ${schedule.name}`)
					await queue.upsertJobScheduler(
						schedule.name,
						{ ...schedule.time },
						{
							name: job.name,
							data: {
								jobData: schedule.prepare && schedule.prepare.data ? schedule.prepare.data : null
							},
							opts: { ...job.options }
						}
					)
				} catch (error) {
					throw new Error(`Set schedule error at ${job.name}: ${error}`)
				}
			}
		}

		const worker = queueManager.getWorker(job.queue, job.handle, job.options ?? {});

		worker.on("completed", (completedJob) => {
			console.log(`Job ${completedJob.id} completed successfully`);
		});

		worker.on("failed", (failedJob, err) => {
			console.error(`Job ${failedJob.id} failed with error ${err.message}`);
		});

		return {
			queue,
			worker
		}
	} catch (jobError) {
		throw new Error(`Error at ${job.name}: ${jobError}`)
	}
};