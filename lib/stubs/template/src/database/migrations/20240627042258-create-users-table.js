"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async function(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_at: {
                type: "TIMESTAMP",
            },
            updated_at: {
                type: "TIMESTAMP",
            }
        });

        await queryInterface.addIndex("users", ["username"], {
            name: "users_username_index"
        });

        await queryInterface.addIndex("users", ["email"], {
            name: "users_email_index"
        });
    },

    down: async function(queryInterface, Sequelize) {
        await queryInterface.removeIndex("users", "users_username_index");
        await queryInterface.removeIndex("users", "users_email_index");

        await queryInterface.dropTable("users");
    }
};