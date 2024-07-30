"use strict";

module.exports = {
    index: async function (req, res) {
        const users = [
            {
                name: "Bamimi user 1",
            },
            {
                name: "Bamimi user 2",
            }
        ];
        return res.status(200).sendMessage(users);
    }
};
