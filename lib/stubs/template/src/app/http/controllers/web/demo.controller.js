"use strict";

module.exports = {
    index: async function (req, res, next) {
        try {
            return await res.view({
                view: "pages/home", data: {
                    version: "v0.5.5"
                }
            });
        } catch (error) {
            next(error)
        }
    }
};