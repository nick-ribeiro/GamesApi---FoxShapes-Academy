var express = require('express');
var router = express.Router();

const UserDao = require('../models/UserDAO');
const UserController = require('../controllers/UserController');
const userDao = new UserDao();
const userController = new UserController(userDao);

// Retorna todos os usuários
router.get('/', (req, res, next) => userController.getUsers(req, res, next));

// Retorna somente o usuário com o id correspondente
router.get('/:id', (req, res, next) => userController.getUser(req, res, next));

// Cria um novo usuário
router.post('/', (req, res, next) => userController.createUser(req, res, next));

// Atualiza um usuário específico
router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));

// Deleta um usuário específico
router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));

module.exports = router;