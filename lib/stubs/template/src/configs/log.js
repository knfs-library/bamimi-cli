require("dotenv").config();

module.exports = {
    logRequest: process.env.LOG_REQUEST == "true" ? true : false || false,
};