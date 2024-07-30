"use strict";
const auth = require("../../../kernel/auth");

module.exports = async (req, res, next) => {
    for (const [key, value] of Object.entries(req.body)) {
        if (
            (key !== "_csrf" || key !== "token")
			&&
			typeof value === "string"
        )
        {
            req.body[key] = value.trim();
        }
    }
    next();
};
