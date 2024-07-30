const JOB_NAME = process.env.JOB_NAME ?? "*";
require("./bootstrap/schedule")(JOB_NAME);