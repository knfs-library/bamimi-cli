"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors")
const authConfig = require("@iConfigs/auth")
const security = require("@iApp/http/middleware/security.mid")
const csrf = require("@knfs-tech/csrf");
const session = require("express-session");
const flash = require("express-flash");

exports.middleware = {
    common: {
        before: [
            /**
             * Update Powered by
             */
            async (req, res, next) => {
                res.setHeader('X-Powered-By', 'Bamimi');
                next();
            },
            /**
             * ************************************************
             * Handle the request before another group request, 
             * 		for instance API or web
             * ************************************************
             */
            /**
             * body parser
             */
            bodyParser.urlencoded({ limit: '2mb', parameterLimit: 100, extended: true }),
            bodyParser.json({ limit: '2mb' }),
            /**
             * Session Handle
             */
            session(authConfig.session),
            cookieParser(authConfig.cookie.secret),
            security(),
            /**
             * CSRF handle
             */
            csrf.generate({
                tokenLength: 24,
                protectCondition: (req) => {
                    return req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE'
                },
                storage: {
                    type: csrf.CONSTANT.STORAGE.COOKIE,
                    options: {
                        httpOnly: true,
                        maxAge: 1 * 24 * 60 * 60 * 1000, // 1days
                        secure: process.env.NODE_ENV === 'production' ? true : false
                    }
                }
            }),
        ],
        after: [
            /**
             * ***********************************************
             * Handle the request after another group request, 
             * 		for instance API or web
             * ***********************************************
             */
            /**
             * Error handle
             */
            async (err, req, res, next) => {
                if (process.env.NODE_ENV != "development") {
                    console.error("LOG ERROR:", err)
                    if ('api' === req.reqType) {
                        res.status(500).sendData({
                            message: err.message || "Internal Server Error"
                        });
                    } else {
                        res.status(500).send("Internal Server Error")
                    }
                } else {
                    res.status(500).send(err.message);
                }
                next()
            },
        ]
    },
    api: [
        async (req, res, next) => {
            req.reqType = 'api'
            next();
        },
        require("@iKernel/response/api"),
        cors(authConfig.cors)
    ],
    web: [
        async (req, res, next) => {
            req.reqType = 'web'
            next();
        },
        /**
         * ****************************
         * FLASH SESSION
         * ****************************
         */
        flash(),
        /**
         * ****************************
         * CSRF
         * ****************************
         */
        csrf.setTokenLocalsParam,
        /**
         * ****************************
         * Response handle
         * ****************************
         */
        require("@iKernel/response/web"),
        /**
         * ****************************
         * method override
         * ****************************
         */
        methodOverride('X-HTTP-Method'),
        methodOverride('X-HTTP-Method-Override'),
        methodOverride('X-Method-Override'),
        methodOverride(function (req, res) {
            if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                var method = req.body._method
                delete req.body._method
                return method
            }
        }),
    ]
}