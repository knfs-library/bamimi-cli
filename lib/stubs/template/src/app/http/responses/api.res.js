"use strict";
const { handle } = require("@iKernel/interface/apis");
const interfaces = require("@iInterfaces/apis")
const xss = require("@iUtils/xss")
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

    const format = (data = null) => {
        if (!req.ignoreXss) {
            xss(data)
        }
        const message = handle(res.statusCode, data);
        return message
    };
    /**
     * 
     * Function set default format response data
     * 
     * @param {*} data 
     * @returns 
     */
    res.sendData = (data = null) => {
        const formattedData = format(data)
        res.json(formattedData)
    }

    /**
     * 
     * Create new function format response data
     * 
     */
    for (const [key, value] of Object.entries(interfaces)) {
        const keyFunc = `send${key.charAt(0).toUpperCase() + key.substr(1).toLowerCase()}`;
        res[keyFunc] = (data = null) => {
            const formattedData = format({
                [key]: value(data)
            })
            return res.json(formattedData)
        }
    }

    next();
};
