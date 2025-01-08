"use strict";
require("dotenv").config();

module.exports = {
    useDatabase: process.env.DB_TYPE || "sql",
    sql: require("./rdbms"),
    nosql: {
        connection: process.env.DB_CONNECTION ?? 'mongodb',
        mongodb: {
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "xxx",
            database: process.env.DB_DATABASE || "xxx",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        }
    }
};
