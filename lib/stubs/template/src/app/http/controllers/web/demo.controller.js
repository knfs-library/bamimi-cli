"use strict";

const { bamimiVersion } = require("./../../../../../package.json")

module.exports = {
    index: async function (req, res, next) {
        try {
            return res.view({
                view: "pages/home", data: {
                    version: `v${bamimiVersion}`
                }
            });
        } catch (error) {
            next(error)
        }
    }
};