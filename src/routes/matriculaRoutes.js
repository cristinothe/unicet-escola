const express = require('express');
const router = express.Router();
const MatriculaController = require('../controllers/MatriculaController');

router.get('/matricula', MatriculaController.listarTodos);
router.get('/matricula/:id', MatriculaController.listarPorId);
router.post('/matricula', MatriculaController.salvar);
router.put('/matricula/:id', MatriculaController.editar);
router.delete('/matricula/:id', MatriculaController.deletar);

module.exports = router;