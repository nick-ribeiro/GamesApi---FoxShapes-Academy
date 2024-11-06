const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Configuration = require('./Configurations'); // Importa o modelo Configuration
const Feedback = require('./Feedback');  // Importa o modelo de Feedback
const Progress = require('./Progress');  // Importa o modelo de Progress

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'users', // Nome da tabela no banco de dados
    timestamps: false,
});

// Relacionamento: Um usuário tem muitas configurações
User.hasMany(Configuration, { foreignKey: 'usuario_id' });

// Relacionamento: Um User pode ter muitos Feedbacks
User.hasMany(Feedback, { foreignKey: 'usuario_id' });

// Relacionamento: Um User pode ter muitos progressos
User.hasMany(Progress, { foreignKey: 'usuario_id' });

module.exports = User;