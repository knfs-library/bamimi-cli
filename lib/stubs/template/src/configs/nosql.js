"use strict";
require("dotenv").config();

module.exports = {
	connection: process.env.DB_CONNECTION ?? 'mongodb',
	/**
	 * Learn more at:
	 * @link [https://mongoosejs.com/]
	 */
	mongodb: {
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || "xxx",
		database: process.env.DB_DATABASE || "xxx",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
	}
};
