"use strict";
const jobConfig = require("../../configs/job");
const runJob = require("./runJob");

/**
 * Run cron job with condition
 * 
 * @param {string} jobName 
 */
module.exports = async (jobName) => {
    // if jobName = "*" run all jobs
    if (jobName === "*") {
        for (const job of jobConfig) {
            if (!job.onMain) {
                await runJob(job.path);
            }
        }
    } else {
        // if jobname is special, run that jobname
        const job = jobConfig.find((ele) => ele.name === jobName);
        if (!job) {
            throw new Error(`Job ${jobName} not found!`);
        }
        if (job.onMain) {
            throw new Error(`Job ${jobName} run on main process`);
        }
        await runJob(job.path);
    }
};