const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Feedback = require('./Feedback');  // Importa o modelo de Feedback
const Progress = require('./Progress');  // Importa o modelo de Progress

const Level = sequelize.define('Level', {
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
        unique: true,
    },
    dificuldade: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'levels',
    timestamps: false,
});

// Relacionamento: Um Level pode ter muitos Feedbacks
Level.hasMany(Feedback, { foreignKey: 'nivel_id' });

// Relacionamento: Um Level pode ter muitos progressos
Level.hasMany(Progress, { foreignKey: 'nivel_id' });

module.exports = Level;