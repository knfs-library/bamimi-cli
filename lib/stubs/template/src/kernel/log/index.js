const morgan = require("morgan");
const config = require("@iConfigs/log");

function logRequest(app) {
    let options = {};

    if (config.logRequest) {
        app.use(morgan("combined", options));
    }
}

module.exports = logRequest;