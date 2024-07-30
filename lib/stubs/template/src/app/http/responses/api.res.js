"use strict";
const { handle } = require("../../../kernel/interface/apis");
/**
 *  API response
 * 
 * @link http://expressjs.com/en/guide/using-middleware.html
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
 */

module.exports = (req, res, next) => {  

    /**
     * 
     * @param {*} data 
     * @returns 
     */
    res.sendMessage = (data = null) => {
        const message = handle(res.statusCode, data);
        return res.json(message);
    };

    next();
};
