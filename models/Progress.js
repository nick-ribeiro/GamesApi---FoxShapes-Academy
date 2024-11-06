const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');
const Level = require('../models/Level');

const Progress = sequelize.define('Progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nivel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    completado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    pontuacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tentativas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'progress', // Nome da tabela no banco de dados
    timestamps: false,
});

// Definindo o relacionamento
Progress.belongsTo(User, { foreignKey: 'usuario_id' });

// Definindo o relacionamento
Progress.belongsTo(Level, { foreignKey: 'nivel_id' });

module.exports = Progress;