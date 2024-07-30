"use strict";
require("dotenv").config();

module.exports = {
    environment: process.env.NODE_ENV || "development",
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "xxx",
        database: process.env.DB_DATABASE || "xxx",
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || "3600",
        dialect: process.env.DB_CONNECTION || "mysql",
        dialectOptions: {
            bigNumberStrings: true,
        },
        options: {
            benchmark: true,
            logging: async (sql, timing) => {
                console.log("SQL: " + sql + "\nTiming: " + timing + " ms");
            },
            pool: {
                max: 6,
                min: 2,
                idle: 6000,
                acquire: 30000,
                evict: 600
            },
            timezones: process.env.TIME_ZONE || "America/Los_Angeles"
        }
    },
    test: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "xxx",
        database: process.env.DB_DATABASE || "xxx",
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || "3600",
        dialect: process.env.DB_CONNECTION || "mysql",
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "xxx",
        database: process.env.DB_DATABASE || "xxx",
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || "3600",
        dialect: process.env.DB_CONNECTION || "mysql",
        dialectOptions: {
            bigNumberStrings: true,
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
            // }
        }
    }
};
