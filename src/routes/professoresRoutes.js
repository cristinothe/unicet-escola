const express = require('express');
const router = express.Router();
const ProfessoresController = require('../controllers/ProfessoresController');

router.get('/professor', ProfessoresController.listarTodos);
router.get('/professor/:id', ProfessoresController.listarPorId);
router.post('/professor', ProfessoresController.salvar);
router.put('/professor/:id', ProfessoresController.editar);
router.delete('/professor/:id', ProfessoresController.deletar);

module.exports = router;