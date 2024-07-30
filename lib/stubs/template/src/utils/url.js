"use strict";
const config = require("../configs/app");

module.exports = (path = "", params = {}) => {
    let url = new URL(`${config.server.url}/${path}`);
    for (const [k, v] of Object.entries(params)) {
        url.searchParams.append(k, v);
    }
    return url;
};