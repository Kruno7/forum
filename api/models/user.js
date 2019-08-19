const Sequelize = require('sequelize')

const sequelize = require('../config/database')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "email is required" },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "password is required" },
        }
    }
});

module.exports = User



