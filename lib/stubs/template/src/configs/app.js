"use strict";
require("dotenv").config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = {
    name: process.env.APP_NAME || "BAMIMI",
    debug: false,
    server: {
        host: process.env.APP_HOST || "localhost",
        port: process.env.APP_PORT || process.env.PORT || 3000,
        ssl: process.env.APP_SSL || false,
        options: {
            key: "",
            cert: "",
        },
        asset: process.env.APP_ASSET || `${this.host}:${this.port}`,
        url: process.env.APP_URL || `${this.host}:${this.port}`,
    },
    openBrowser: process.env.OPEN_BROWSER === 'true' ? true : false, 
    useTableInformation: false,
    timeZone: process.env.TIME_ZONE || "America/Los_Angeles",
    staticCacheTime: 360000,
};
