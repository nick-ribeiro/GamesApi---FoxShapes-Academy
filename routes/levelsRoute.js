var express = require('express');
var router = express.Router();

const LevelDao = require('../models/LevelDAO');
const LevelController = require('../controllers/LevelController');
const levelDao = new LevelDao();
const levelController = new LevelController(levelDao);

// Retorna todos os níveis
router.get('/', (req, res, next) => levelController.getLevels(req, res, next));

// Retorna somente o nível com o id correspondente
router.get('/:id', (req, res, next) => levelController.getLevel(req, res, next));

// Cria um novo nível
router.post('/', (req, res, next) => levelController.createLevel(req, res, next));

// Atualiza um nível específico
router.put('/:id', (req, res, next) => levelController.updateLevel(req, res, next));

// Deleta um nível específico
router.delete('/:id', (req, res, next) => levelController.deleteLevel(req, res, next));

module.exports = router;