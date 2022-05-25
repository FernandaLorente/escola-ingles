'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

     matriculas.belongsTo(models.Pessoas, {
      foreignKey: 'estudante_id'
    });

     matriculas.belongsTo(models.turmas, {
      foreignKey: 'turma_id'
    });
     
    }
  }
  matriculas.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'matriculas',
    paranoid: true,
  });
  return matriculas;
};