"use strict";
const { getView } = require("../../../kernel/interface/web/extend");
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
	 * @param {layout: string, view: string, data: *} data 
	 * @returns 
	 */
    res.view = ({ layout = "layouts/main", view = "", data = {} }) => {
        return res.render(layout, {
            body: `${view}`,
            data: data,
        });
    };

    /**
	 * 
	 * @param {String} module
	 * @param {String} view
	 * @param {*} data
	 * 
	 * @returns
	 */
    res.viewModule = (module, view, data = {}) => {
        view = path.join(__dirname, "../../../modules", module, "interfaces/web", view);
        return res.view({
            view: view, 
            data: data
        });
    };

    next();
};
