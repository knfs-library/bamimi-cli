require("dotenv").config();

module.exports = {
    logRequest: process.env.LOG_REQUEST == 1 ? true : false || false,
};