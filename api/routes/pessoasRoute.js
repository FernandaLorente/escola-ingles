const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.listarPessoasAtivas);
router.get('/pessoas/todos', PessoaController.listarTodos);// usando scope
//             esses : indica que recebera um parametro
router.get('/pessoas/:id', PessoaController.listarPorId);
router.post('/pessoas', PessoaController.criarPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);
router.post('/pessoas/:id/restaura', PessoaController.retaurarPessoa);

//Matricula
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.listarPorMatricula);
router.get('/pessoas/:estudanteId/matricula', PessoaController.matriculasPorPessoa);
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.matriculasPorTurma);
router.get('/pessoas/matricula/lotada', PessoaController.turmasLotadas);
router.post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatriculas);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restaurarMatricula);



module.exports = router;