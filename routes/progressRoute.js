var express = require('express');
var router = express.Router();

const ProgressDAO = require('../models/ProgressDAO');
const ProgressController = require('../controllers/ProgressController');
const progressDao = new ProgressDAO();
const progressController = new ProgressController(progressDao);

// Retorna todos os níveis
router.get('/', (req, res, next) => progressController.getProgress(req, res, next));

// Retorna todo o progresso de um usuário
router.get('/user/:usuario_id', (req, res) => progressController.getProgressByUser(req, res));

// Retorna o progresso de um usuário em um nível específico
router.get('/user/:usuario_id/levels/:nivel_id', (req, res) => progressController.getProgressByLevel(req, res));

// Cria um novo progresso
router.post('/', (req, res) => progressController.createProgress(req, res));

// Atualiza um progresso específico
router.put('/:id', (req, res) => progressController.updateProgress(req, res));

// Deleta um progresso específico
router.delete('/:id', (req, res) => progressController.deleteProgress(req, res));

module.exports = router;