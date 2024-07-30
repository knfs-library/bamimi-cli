
const config = require("../../configs/database");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(config.development);

module.exports = sequelize;