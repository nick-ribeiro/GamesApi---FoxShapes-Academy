var express = require('express');
var router = express.Router();

const AchivementsDAO = require('../models/AchivementsDAO');
const AchivementController = require('../controllers/AchivementController');
const achivementDao = new AchivementsDAO();
const achivementController = new AchivementController(achivementDao);

// Retorna todos os achievements
router.get('/', (req, res) => achivementController.getAchivements(req, res));

// Retorna um achievement específico
router.get('/:id', (req, res) => achivementController.getAchivement(req, res));

// Cria um novo achievement
router.post('/', (req, res) => achivementController.createAchivement(req, res));

// Atualiza um achievement específico
router.put('/:id', (req, res) => achivementController.updateAchivement(req, res));

// Deleta um achievement específico
router.delete('/:id', (req, res) => achivementController.deleteAchivement(req, res));

module.exports = router;