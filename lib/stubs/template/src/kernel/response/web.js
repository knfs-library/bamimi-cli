"use strict";
const csrf = require("@iUtils/csrf")
const asset = require("@iUtils/asset")
const url = require("@iUtils/url")
const file = require("@iUtils/file")
const date = require("@iUtils/date")
const xss = require("@iUtils/xss")
const path = require("path");
/**
 *  Web Response
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
     *  * Handle web response for view in default web interface
     * 
     * @param {layout: string, view: string, data: *} data 
     * @returns 
     */
    res.view = ({ layout = "layouts/main", view = "", data = {} }) => {
        if (!req.ignoreXss) {
            xss(data)
        }
        return res.render(layout, {
            body: `${view}`,
            data: {
                ...data,
                $_asset: asset,
                $_csrf: csrf,
                $_url: url,
                $_file: file,
                $_date: date
            }
        });
    };

    /**
     * 
     * Handle web response for view in modules
     * 
     * @param {String} module
     * @param {String} view
     * @param {*} data
     * 
     * @returns
     */
    res.viewModule = (module, view, data = {}) => {
        view = path.join(__dirname, "../../modules", module, "interfaces/web", view);
        return res.view({
            view: view,
            data: data
        });
    };

    next();
};
