
"use strict";
/**
 * Module `DB`
 * 
 * Module to init and return Database connection with SQL or NoSQL.
 * Auto get config from `@iConfigs/database`.
 * 
 * @module DB
 * 
 * @requires @iConfigs/database - Config of database
 * @requires sequelize
 * @requires mongodb
 */

const config = require("@iConfigs/database");

/**
 * Connect and get DB with params
 * 
 * @function get
 * 
 * @param {Object} options - To determine database information
 * @param {string} options.useDatabase - Type of Database (e.g: "sql", "nosql").
 *                                         If no specified, module will use default value
 *                                         from `config.useDatabase`.
 * 
 * @returns {Object} - Connection Database Object:
 *                     - With SQL: return Sequelize instance.
 *                     - With NoSQL (e.g: MongoDB): return flexible connection (default is Mongoose)
 * 
 * @example
 * Use default value from config
 * const db = require('@iKernel/database').get();
 * 
 * @example
 * // Use SQL (Sequelize)
 * const db = require('@iKernel/database').get({ useDatabase: 'sql' });
 * 
 * @example
 * // Use NoSQL (MongoDB)
 * const db = require('@iKernel/database').get({ useDatabase: 'nosql' });
 */
exports.get = ({ useDatabase }) => {
	/**
	 * Many connection database method
	 */
	const useDBs = {
		/**
		 * SQL Connection
		 * 
		 * @function sql
		 * @returns {require("sequelize")} - Return instance of Sequelize
		 */
		sql: function () {
			return require("./sequelize")(config.sql[config.sql.environment])
		},
		/**
		 * NoSQL Connection
		 * 
		 * @function nosql
		 * @returns {Object} - Return mongoose or other (future update).
		 */
		nosql: function () {
			switch (config.nosql.connection) {
				case "mongodb":
					db = require("./mongodb")(config.nosql.mongodb)
					break;
			}
		}
	}

	const db = useDatabase ? useDBs[useDatabase]() : useDBs[config.useDatabase]();

	return db
}