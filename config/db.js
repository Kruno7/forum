const Sequelize = require('sequelize')
module.exports = new Sequelize('forum', 'root', 'example', {
    host: 'localhost',
    port: '43307',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },

});