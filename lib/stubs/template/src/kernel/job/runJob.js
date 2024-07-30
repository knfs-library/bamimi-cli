"use strict";
const path = require("path");
const BASE_PATH = "./../../app/jobs";
const { getQueue, getWorker } = require("../queue");

module.exports = async (jobPath) => {
    const job = require(path.join(__dirname, BASE_PATH, jobPath));
    if (job.setCronJob) {
        const queue = await getQueue(job.queue);
        queue.add(job.name, {}, {
            repeat: {
                cron: job.setCronJob.cronTime,
                tz: "Asia/Ho_Chi_Minh"
            },
            backoff: job.setCronJob.backoff,
            ttl: job.setCronJob.ttl,
            attempts: job.setCronJob.attempts
        });
    } 
    getWorker(job.queue, job.handle)
        .on("completed", job => {
            console.log(`Cron job ${job.id} completed successfully`);
        })
        .on("failed", (job, err) => {
            console.error(`Cron job ${job.id} failed with error ${err.message}`);
        });
};