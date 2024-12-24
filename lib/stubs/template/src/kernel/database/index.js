
const config = require("@iConfigs/database");

const getDB = ({ useDatabase }) => {
	const useDBs = {
		sql: function () {
			return require("./sequelize")(config.sql[config.sql.environment])
		},
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

module.exports = getDB;