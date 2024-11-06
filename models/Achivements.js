const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Certifique-se de que o sequelize está configurado corretamente.

const Achivement = sequelize.define('Achivement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    requisitos: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'achivements', // Nome da tabela no banco de dados
    timestamps: false, // Define para não utilizar os campos createdAt/updatedAt
});

module.exports = Achivement;