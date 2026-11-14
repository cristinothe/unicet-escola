const express = require('express');
const router = express.Router();
const TurmasController = require('../controllers/TurmasController');

router.get('/turma', TurmasController.listarTodos);
//router.get('/turma/nome', TurmasController.listarNome);
router.get('/turma/:id', TurmasController.listarPorId);
router.post('/turma', TurmasController.salvar);
router.put('/turma/:id', TurmasController.editar);
router.delete('/turma/:id', TurmasController.deletar);

module.exports = router;