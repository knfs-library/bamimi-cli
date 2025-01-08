"use strict";
const auth = require("@iKernel/auth")

module.exports = async (req, res, next) => {
    try {
        if (!req.session.currentUser) {
            req.flash("errors", [
                {
                    msg: "Unauthorized"
                }
            ]);
            return res.redirect("/login");
        }

        next();

    } catch (error) {
        console.error(error)
        throw new Error("Authentication error");
    }
};
