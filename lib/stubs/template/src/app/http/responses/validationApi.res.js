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
        res.status(400);
        return await res.sendMessage(errors.array());
    }

    next();
};