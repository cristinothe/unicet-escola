const express = require('express');
const router = express.Router();
const CursosController = require('../controllers/CursosController');

router.get('/cursos', CursosController.listarTodos);
router.get('/cursos/:id', CursosController.listarPorId);
router.post('/cursos', CursosController.salvar);
router.put('/cursos/:id', CursosController.editar);
router.delete('/cursos/:id', CursosController.deletar);

module.exports = router;