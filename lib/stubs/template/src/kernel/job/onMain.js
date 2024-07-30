"use strict";
const jobConfig = require("../../configs/job");
const runJob = require("./runJob");

module.exports = async () => {
    for (const job of jobConfig) {
        if (job.onMain) {
            await runJob(job.path);
        }
    }
};