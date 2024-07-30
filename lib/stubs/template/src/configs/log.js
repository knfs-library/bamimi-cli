require("dotenv").config();

module.exports = {
    logRequest: process.env.LOG_REQUEST == 1 ? true : false || false,
    logFile: {
        access: process.env.LOG_FILE == 1 ? true : false || false,
        ttl: 3 * 60, //Time- to - live in days
    },
};