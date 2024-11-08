const express = require('express');
const router = express.Router();

const FeedbackDAO = require('../models/FeedbackDAO');
const FeedbackController = require('../controllers/FeedbackController');
const feedbackDao = new FeedbackDAO();
const feedbackController = new FeedbackController(feedbackDao);

// Retorna todos os níveis
router.get('/', (req, res, next) => feedbackController.getFeedback(req, res, next));

// Retorna todos os feedbacks de um usuário
router.get('/user/:usuario_id', (req, res) => feedbackController.getFeedbacks(req, res));

// Retorna o feedback de um usuário em um nível específico
router.get('/user/:usuario_id/levels/:nivel_id', (req, res) => feedbackController.getFeedbackByNivel(req, res));

// Cria um novo feedback
router.post('/', (req, res) => feedbackController.createFeedback(req, res));

// Atualiza um feedback
router.put('/:id', (req, res) => feedbackController.updateFeedback(req, res));

// Deleta um feedback
router.delete('/:id', (req, res) => feedbackController.deleteFeedback(req, res));

module.exports = router;