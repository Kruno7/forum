const Sequelize = require('sequelize')

const sequelize = require('../config/database')

const Topic = sequelize.define('topics', {
    title: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    }
});

module.exports = Topic