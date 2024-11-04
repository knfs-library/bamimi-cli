"use strict";
const constant = require("../configs/constant")

function generatePage(page, size) {
    let limit = Number(size) ?? 20;
    limit = limit > constant.page.maxLimit ? constant.page.maxLimit : Number(limit);
    const offset = page ? (Number(page) - 1) * limit : 1;

    return { limit, offset };
};

function generateUrl(query) {
    for (const qk of Object.keys(query)) {
        if (qk === 'page') {
            delete query[qk]
            continue
        }
        if (!query[qk]) {
            delete query[qk]
        }
    }

    return query
}

module.exports = {
    generatePage,
    generateUrl
};

