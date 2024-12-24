"use strict";

module.exports = {
    index: async function (req, res, next) {
        try {
            const users = [
                {
                    name: "Bamimi user 1",
                },
                {
                    name: "Bamimi user 2",
                }
            ];
            return res.status(200).sendMessage(users);
        } catch (error) {
            next(error)
        }
    }
};
