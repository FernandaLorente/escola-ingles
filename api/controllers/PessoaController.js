const database = require("../models");

class PessoaController {
  static async listarTodos(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
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
}

module.exports = PessoaController;
