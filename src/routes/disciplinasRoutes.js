const express = require('express');
const router = express.Router();
const DisciplinasController = require('../controllers/DisciplinasController');

router.get('/disciplinas', DisciplinasController.listarTodos);
router.get('/disciplinas/:id', DisciplinasController.listarPorId);
router.post('/disciplinas', DisciplinasController.salvar);
router.put('/disciplinas/:id', DisciplinasController.editar);
router.delete('/disciplinas/:id', DisciplinasController.deletar);

module.exports = router;