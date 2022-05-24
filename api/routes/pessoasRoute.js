const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.listarTodos);
//             esses : indica que recebera um parametro
router.get('/pessoas/:id', PessoaController.listarPorId);
router.post('/pessoas', PessoaController.criarPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);

//Matricula
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.listarPorMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatriculas);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula);



module.exports = router;