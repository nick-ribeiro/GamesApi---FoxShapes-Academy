const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gamesApi', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;