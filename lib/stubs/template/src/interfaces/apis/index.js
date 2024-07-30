"use strict";
/**
 * @param {Object} message
 * 
 * @description
 */
exports.message = {
    meta: {
        content: "",
        code: 500
    }
};

/**
 * @param {String[]}
 */

const typeMessageEnum = {
    ERROR: "errors",
    DATA: "data"
};
exports.typeMessageEnum;

/**
 * @param {[{status: number, typeMessage: }]}
 */
exports.content = [
    {
        status: 200,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Successful"
    },
    {
        status: 400,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Bad Request"
    },
    {
        status: 404,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Not Found"
    },
    {
        status: 401,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Unauthorized"
    },
    {
        status: 403,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Forbidden"
    },
    {
        status: 405,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Method Not Allowed"
    },
    {
        status: 419,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Request limit exceeded"
    },
    {
        status: 500,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "System Error"
    },
];