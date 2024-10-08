const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../kernel/database");
const auth = require("../../kernel/auth");

const User = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        field: "created_at",
        type: "TIMESTAMP",
    },
    updatedAt: {
        field: "updated_at",
        type: "TIMESTAMP",
    },
}, {
    getterMethods: {
    },
    hooks: {
        beforeCreate: async (user, options) => {
            user.password = await auth.hashPassword(user.password, 10);
        },
        beforeUpdate: async (user, options) => {
            if (user.changed("password")) {
                user.password = await auth.hashPassword(user.password, 10);
            }
        },
    },
    timestamps: true
});

module.exports = User;
