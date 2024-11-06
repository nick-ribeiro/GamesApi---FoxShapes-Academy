const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');
const Level = require('../models/Level');

const Feedback = sequelize.define('Feedback', {
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
    pontos_fortes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pontos_melhorar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'feedbacks',
    timestamps: false,
});

// Definindo o relacionamento
Feedback.belongsTo(User, { foreignKey: 'usuario_id' });

// Definindo o relacionamento
Feedback.belongsTo(Level, { foreignKey: 'nivel_id' });

module.exports = Feedback;