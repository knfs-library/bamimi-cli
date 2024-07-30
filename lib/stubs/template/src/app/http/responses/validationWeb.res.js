"use strict";
const {
    validationResult,
} = require("express-validator");
/**
 *  ErrorMiddleware 
 * 
 * @link http://expressjs.com/en/guide/using-middleware.html
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
 */


module.exports = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const backUrl = req.header("Referer") || "/";
		
        req.flash("errors", errors.array());
        return await res.redirect(backUrl);
    }

    next();
};