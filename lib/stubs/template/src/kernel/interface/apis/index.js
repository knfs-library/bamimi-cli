"use strict";
/**
 * Module `interface api handle`
 * 
 * Module to init and return Database connection with SQL or NoSQL.
 * Auto get config from `@iConfigs/database`.
 * 
 * @module 
 * 
 * @requires structure - structure of response
 */
const { content: ifaContent, message: ifaMsg } = require("./structure");
/**
 * @typedef {{code: number, content: string}} meta
 * @typedef {{meta: meta, data: Object}} messageData 
 * @typedef {{meta: meta, errors: Object}} messageError
 */
/**
 * Get format response
 * 
 * @function handle
 * 
 * @param {Number} status - state of response
 * @param {Object} data - response data
 * 
 * @returns {messageData | messageError} {@link messageData} | {@link messageError } 
 * 
 * @example
 * Import module
 * const { handle } = require("@iKernel/interface/api")
 * 
 * @example
 * // With data
 * const response = handle(200, {msg: "OK la"})
 * console.log(response) - 
 * {
 *     meta: {
 *         status: 200,
 *         content: "OK"
 *     },
 *     data: {
 *         msg: "Ok la"
 *     }
 *  }
 * 
 * @example
 * // With error
 * const response = handle(403, [{"msg": "Not admin"}])
 * console.log(response) - 
 * {
 *     meta: {
 *         status: 403,
 *         content: "Forbidden"
 *     },
 *     errors: [{
 *         msg: "Not admin"
 *     }]
 *  }
 */
exports.handle = (status, data = null) => {

    let message = { ...ifaMsg };

    const founder = ifaContent.find((msg) => msg.status == status);

    message.meta.content = founder.metaData;
    message.meta.code = founder.status;
    message[founder.typeMessage] = data;

    return message;
};