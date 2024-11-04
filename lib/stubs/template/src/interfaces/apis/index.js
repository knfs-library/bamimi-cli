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
    // 1xx - Information
    {
        status: 100,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Continue"
    },
    {
        status: 101,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Switching Protocols"
    },
    {
        status: 102,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Processing"
    },
    {
        status: 103,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Early Hints"
    },

    // 2xx - Success
    {
        status: 200,
        typeMessage: typeMessageEnum.DATA,
        metaData: "OK"
    },
    {
        status: 201,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Created"
    },
    {
        status: 202,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Accepted"
    },
    {
        status: 203,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Non-Authoritative Information"
    },
    {
        status: 204,
        typeMessage: typeMessageEnum.DATA,
        metaData: "No Content"
    },
    {
        status: 205,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Reset Content"
    },
    {
        status: 206,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Partial Content"
    },
    {
        status: 207,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Multi-Status"
    },
    {
        status: 208,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Already Reported"
    },
    {
        status: 226,
        typeMessage: typeMessageEnum.DATA,
        metaData: "IM Used"
    },

    // 3xx - Redirect
    {
        status: 300,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Multiple Choices"
    },
    {
        status: 301,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Moved Permanently"
    },
    {
        status: 302,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Found"
    },
    {
        status: 303,
        typeMessage: typeMessageEnum.DATA,
        metaData: "See Other"
    },
    {
        status: 304,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Not Modified"
    },
    {
        status: 305,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Use Proxy"
    },
    {
        status: 307,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Temporary Redirect"
    },
    {
        status: 308,
        typeMessage: typeMessageEnum.DATA,
        metaData: "Permanent Redirect"
    },

    // 4xx - Error Client Side
    {
        status: 400,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Bad Request"
    },
    {
        status: 401,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Unauthorized"
    },
    {
        status: 402,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Payment Required"
    },
    {
        status: 403,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Forbidden"
    },
    {
        status: 404,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Not Found"
    },
    {
        status: 405,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Method Not Allowed"
    },
    {
        status: 406,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Not Acceptable"
    },
    {
        status: 407,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Proxy Authentication Required"
    },
    {
        status: 408,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Request Timeout"
    },
    {
        status: 409,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Conflict"
    },
    {
        status: 410,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Gone"
    },
    {
        status: 411,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Length Required"
    },
    {
        status: 412,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Precondition Failed"
    },
    {
        status: 413,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Payload Too Large"
    },
    {
        status: 414,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "URI Too Long"
    },
    {
        status: 415,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Unsupported Media Type"
    },
    {
        status: 416,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Range Not Satisfiable"
    },
    {
        status: 417,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Expectation Failed"
    },
    {
        status: 418,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "I'm a Teapot"
    },
    {
        status: 422,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Unprocessable Entity"
    },
    {
        status: 423,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Locked"
    },
    {
        status: 424,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Failed Dependency"
    },
    {
        status: 425,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Too Early"
    },
    {
        status: 426,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Upgrade Required"
    },
    {
        status: 428,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Precondition Required"
    },
    {
        status: 429,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Too Many Requests"
    },
    {
        status: 431,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Request Header Fields Too Large"
    },
    {
        status: 451,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Unavailable For Legal Reasons"
    },

    // 5xx - Error Server Side
    {
        status: 500,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Internal Server Error"
    },
    {
        status: 501,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Not Implemented"
    },
    {
        status: 502,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Bad Gateway"
    },
    {
        status: 503,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Service Unavailable"
    },
    {
        status: 504,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Gateway Timeout"
    },
    {
        status: 505,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "HTTP Version Not Supported"
    },
    {
        status: 506,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Variant Also Negotiates"
    },
    {
        status: 507,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Insufficient Storage"
    },
    {
        status: 508,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Loop Detected"
    },
    {
        status: 510,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Not Extended"
    },
    {
        status: 511,
        typeMessage: typeMessageEnum.ERROR,
        metaData: "Network Authentication Required"
    }
];
