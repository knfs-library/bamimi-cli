const { Sequelize } = require("sequelize");

let sequelize = null;

module.exports = (config) => {
	if (!sequelize) {
		sequelize = new Sequelize(config);
		
	}
	sequelize.authenticate()
		.then(() => {
			console.log("Connection has been established successfully.");
		})
		.catch((error) => {
			console.error("Unable to connect to the database:", error);
		});
	return sequelize;
}