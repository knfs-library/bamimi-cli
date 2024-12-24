"use strict";
const pkv = require("../../../../../package.json");

module.exports = {
    index: async function (req, res, next) {
        try {
            return await res.view({
                view: "pages/home", data: {
                    version: pkv.version
                }
            });
        } catch (error) {
            next(error)
        }
    }
};