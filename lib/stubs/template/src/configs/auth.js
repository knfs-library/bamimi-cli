"use strict";
require("dotenv").config();

module.exports = {
    /**
     * Learn more at:
     * @link https://github.com/expressjs/cors#readme
     */
    cors: {
        origin: process.env.CORS_ADDRESS_FAMILY ? process.env.CORS_ADDRESS_FAMILY.split(",") : "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: "Authorization",
        credentials: false
    },
    /**
     * Learn more at
     * @link 
     */
    session: {
        secret: process.env.SESSION_SECRET || "SESSION_SECRET",
        resave: false,
        saveUninitialized: true
    },
    /**
    * Learn more at
    * @link 
    */
    cookie: {
        secret: process.env.COOKIE_SECRET || "COOKIE_SECRET"
    },
    socketToken: process.env.TOKEN_SOCKET || "TOKEN_SOCKET",
    /**
     * Learn more at:
     * @link https://www.npmjs.com/package/@knfs-tech/bamimi-auth
     */
    authenticate: {
        accessPassword: {
            idFields: ["username", "email"], // fields id to verify, you can use with multiple ['username', 'email']
            pinField: ["password"] // field as password, you can use with other name field
        },
        tokenBasedToken: {
            accessToken: {
                secretKey: process.env.SECRET_KEY,
                options: {
                    expiresIn: "1d"
                }
            },
            refreshToken: {
                secretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
                options: {
                    expiresIn: "30d"
                },
                multiple: false, // if you want to multiple refresh token, in case multiple device
                use: false // if you want to use refresh token
            },
            useBlacklist: true, // if you want to black list to block token
            // storage for save refresh token (in case using multiple) and use black list
            storage: {
                /**
                 * @type {Enum("memory", "redis")}
                 */
                type: "memory",
                options: {} // if you redis, it is connection info of redis, In code we use ioredis
            },
            // fields of origin data to create token
            fields: [
                "id",
                "username",
                "email"
            ]
        },
        mfa: {
            appName: "bamimi-app",
            fieldId: "id" // id for uri auth and Qrcode
        }
    }
};