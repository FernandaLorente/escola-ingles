// const database = require("../models");
// const Sequelize = require('sequelize');

const Services = require('../services/Services');

const pessoasServices = new Services('Pessoas');

class PessoaController {

  static async listarPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.todosOsRegistros();
      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarTodos(req, res) {
    try {// escopo que criamos como parametro para mostrar todos
      const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarPorId(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          //  coluna id: id de params que sera passado
          id: Number(id),
        },
      });
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const pessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).json(pessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarPessoa(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;

    try {
      //Atualiza os dados
      await database.Pessoas.update(novasInfos, {
        where: {
          id: Number(id),
        },
      });
      // Guarda os dados atualizados, para exibir
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });
      // Exibe os dados atualizados
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) }});

      return res.status(200).json({ mensagem: `id ${id} deletado com sucesso` });

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async retaurarPessoa(req, res) {
    const{ id } = req.params;
    try{
      await database.Pessoas.restore( {where:{id: Number(id) }});
      return res.status(200).json({message: `id ${id} restaurado com sucesso.`})
    
    }catch(error){
      return res.status(500).json(error.message);
    }
  
  }




  //MATRiCULAS

  static async listarPorMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.matriculas.findOne({
        where: {
// coluna id: id de params que sera passado
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarMatricula(req, res) {
    const {estudanteId} = req.params
    const novaMatricula = {...req.body, estudante_id: Number(estudanteId)};
    try {
      const matriculaCriada = await database.matriculas.create(novaMatricula);
      return res.status(200).json(matriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }


  static async atualizarMatriculas(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;

    try {
      //Atualiza os dados
      await database.matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        },
      });
      // Guarda os dados atualizados, para exibir
      const matriculaAtualizada = await database.matriculas.findOne({
        where: {
          id: Number(matriculaId)
        },
      });
      // Exibe os dados atualizados
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarMatricula(req, res) {
    const { matriculaId } = req.params;
    try {
      await database.matriculas.destroy({ where: { id: Number(matriculaId) }});

      return res.status(200).json({ mensagem: `id ${matriculaId} deletado com sucesso` });

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restaurarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json({ mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }


  static async matriculasPorPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) }});
      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }


  static async matriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasMatriculas = await database.matriculas.
      findAndCountAll({
        where : {
          turma_id: Number(turmaId),
          status : 'confirmado'
        },
        limit : 20,
        order : [['estudante_id', 'ASC']]
      });

      return res.status(200).json(todasMatriculas);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }


  static async turmasLotadas(req, res) {
    const maxTurma = 2;
    try {
      const turmasLotadas = await database.matriculas
      .findAndCountAll({
        where: {
          status : 'confirmado'
        },
        attributes : ['turma_id'],
        group : ['turma_id'],
        having: Sequelize.literal(`count(turma_id) >= ${maxTurma}`)
      })
      return res.status(200).json(turmasLotadas.count)

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }


  
  static async cancelarPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      database.sequelize.transaction( async t => {
        await database.Pessoas
          .update(
            { ativo : false },
            {where : { id : Number(estudanteId) }},
            {transaction : t}
            )
  
        await database.matriculas
          .update(
            { status : 'cancelado' },
            {where : { estudante_id : Number(estudanteId) }},
            {transaction : t}
            )    
    
        return res.status(200).json({ message : `Matriculas referente ao estudante ${estudanteId} canceladas`})
      })

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
