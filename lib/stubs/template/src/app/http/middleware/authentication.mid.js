"use strict";
const auth = require("../../../kernel/auth");
const jwt = auth.getJWT();

module.exports = async (req, res, next) => {
    try {
        const tokenKey = "bamimiToken";
        const token = req.cookies[tokenKey] || req.session[tokenKey];
        if (!token) {
            return res.redirect("/login");
        }

        const verifiedPayload = await jwt.verify(token).catch(error => {
            return {
                error: error
            };
        });

        if (!verifiedPayload) {
            res.clearCookie(tokenKey);
            delete req.session[tokenKey];
            delete req.session.currentUser;
            req.flash("errors", [
                {
                    msg: "Unauthorized"
                }
            ]);
            return res.redirect("/login");
        }

        req.session.currentUser = verifiedPayload;
        res.locals.currentUser = verifiedPayload;
        next();

    } catch (error) {
        throw new Error("Authentication error");
    }
};
