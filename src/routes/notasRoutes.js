const express = require('express');
const router = express.Router();
const NotasController = require('../controllers/NotasController');

router.get('/notas', NotasController.listarTodos);
router.get('/notas/:id', NotasController.listarPorId);
router.post('/notas', NotasController.salvar);
router.put('/notas/:id', NotasController.editar);
router.delete('/notas/:id', NotasController.deletar);

module.exports = router;