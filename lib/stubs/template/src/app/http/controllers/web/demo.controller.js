"use strict";

const { bamimiVersion } = require("./../../../../../package.json")

module.exports = {
    index: async function (req, res, next) {
        try {
            await res.view({
                view: "pages/home", data: {
                    version: `v${bamimiVersion}`
                }
            });

            next();
        } catch (error) {
            next(error)
        }
    }
};