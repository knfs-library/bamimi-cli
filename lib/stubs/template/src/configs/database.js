"use strict";
require("dotenv").config();

module.exports = {
    useDatabase: process.env.DB_TYPE || "sql",
    sql: {
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
            benchmark: true,
            logging: async (sql, timing) => {
                console.log('SQL: ' + sql + '\nTiming: ' + timing + ' ms')
            },
            pool: {
                max: 6,
                min: 2,
                idle: 6000,
                acquire: 30000,
                evict: 600
            },
            timezones: process.env.TZ || 'America/Los_Angeles'
        },
        test: {
            username: process.env.DB_USERNAME || "root",
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
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "xxx",
            database: process.env.DB_DATABASE || "xxx",
            host: process.env.DB_HOST || "127.0.0.1",
            port: process.env.DB_PORT || "3600",
            dialect: process.env.DB_CONNECTION || "mysql",
            dialectOptions: {
                bigNumberStrings: true,
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            benchmark: true,
            logging: (sql, timing) => {
                const log = {
                    SQL: sql,
                    Timing: timing + ' ms'
                }
                console.log(log)
            },
            pool: {
                max: 6,
                min: 2,
                idle: 6000,
                acquire: 30000,
                evict: 600
            },
            timezones: process.env.TZ || 'America/Los_Angeles'
        }
    },
    nosql: {
        connection: process.env.DB_CONNECTION ?? 'mongoose',
        mongo: {
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "xxx",
            database: process.env.DB_DATABASE || "xxx",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        }
    }
};
