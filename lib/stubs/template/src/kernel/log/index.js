const morgan = require("morgan");
const config = require("../../configs/log");

function logRequest(app) {
    let options = {};

    if (config.logRequest) {
        app.use(morgan("combined", options));
    }
}

module.exports = logRequest;