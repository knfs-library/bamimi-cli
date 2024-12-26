"use strict";
const { QueueManager } = require("@knfs-tech/bamimi-schedule")

module.exports = {
    index: async function (req, res, next) {
        try {
            QueueManager.singleton().getQueue("demoQueue").add("demo")
            return await res.view({
                view: "pages/home", data: {
                    version: "0.5.2"
                }
            });
        } catch (error) {
            next(error)
        }
    }
};