'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
  
    static associate(models) { // Se eu não passar o nome o Sequelize ai criar como PessoaId o novo campo.

      Pessoas.hasMany(models.turmas, {
        foreignKey: 'docente_id'
      });

      Pessoas.hasMany(models.matriculas, {
        foreignKey: 'estudante_id'
      });

    }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dados do e-mail inválidos.'
        }
      } 
    }, 
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope:{
    where: {ativo: true}
  },
    scopes: {
    todos: {where: {}}
    //etc: { constraint: valor}
    }

  });
  return Pessoas;
};