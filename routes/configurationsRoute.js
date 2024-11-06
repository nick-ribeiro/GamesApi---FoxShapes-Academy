const express = require('express');
const router = express.Router();

const ConfigurationsDAO = require('../models/ConfigurationsDAO');
const ConfigurationsController = require('../controllers/ConfigurationController');
const configurationDao = new ConfigurationsDAO();
const configurationController = new ConfigurationsController(configurationDao);

// Retorna todos os níveis
router.get('/', (req, res, next) => configurationController.getConfiguration(req, res, next));

// Retorna todas as configurações de um usuário
router.get('/user/:usuario_id', (req, res) => configurationController.getConfigurationByUser(req, res));

// Cria uma nova configuração
router.post('/', (req, res) => configurationController.createConfiguration(req, res));

// Atualiza uma configuração
router.put('/:id', (req, res) => configurationController.updateConfiguration(req, res));

// Deleta uma configuração
router.delete('/:id', (req, res) => configurationController.deleteConfiguration(req, res));

module.exports = router;