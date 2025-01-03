"use strict";

module.exports = {
    index: async function (req, res, next) {
        try {
            const user = {
                id: 1,
                name: "demo user",
                age: 12
            }
            res.status(200).sendUser(user);
        } catch (error) {
            next(error)
        }
    }
};
