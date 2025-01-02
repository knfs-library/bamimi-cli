"use strict";
const morgan = require("morgan");
const config = require("@iConfigs/log");

function logRequest(app) {
    let options = {};

    if (config.logRequest) {
        app.use(morgan("combined", options));
        app.use((req, res, next) => {
            const startTime = Date.now();

            res.on("finish", () => {
                const duration = Date.now() - startTime;
                console.log(`TTR: ${duration}ms`);
            });

            next();
        },)
    }
}

module.exports = logRequest;