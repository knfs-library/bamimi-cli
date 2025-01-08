"use strict";
require("dotenv").config();

module.exports = {
    useDatabase: process.env.DB_TYPE || "sql",
    sql: require("./rdbms"),
    nosql: require("./nosql")
};
