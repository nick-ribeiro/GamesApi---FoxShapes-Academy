const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');

const Configuration = sequelize.define('Configuration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idioma: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nivel_acessibilidade: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'configurations', // Nome da tabela no banco de dados
    timestamps: false,
});

// Definindo o relacionamento
Configuration.belongsTo(User, { foreignKey: 'usuario_id' });

module.exports = Configuration; // Verifique se está exportado corretamente