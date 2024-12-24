
const config = require("../../configs/database");

let db;

if (config.typeDatabase === "sql") {
	db = require("./sequelize")(config.sql.development)
} else {
	switch (config.nosql.connection) {
		case "mongodb":
			db = require("./mongodb")(config.nosql.mongodb)
			break;
	}

}

const getDB = ({ useDatabase }) => {
	const useDBs = {
		sql: function () {
			return require("./sequelize")(config.sql[config.sql.environment])
		},
		nosql: function () {
			switch (config.nosql.connection) {
				case "mongodb":
					db = require("./mongodb")(config.nosql.mongo)
					break;
			}
		}
	}

	const db = useDatabase ? useDBs[useDatabase]() : useDBs[config.useDatabase]();
}

module.exports = getDB;