'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     turmas.hasMany(models.matriculas, {
      foreignKey: 'turma_id'
    });

    turmas.belongsTo(models.Pessoas, {
      foreignKey: 'docente_id'
    });

    turmas.belongsTo(models.niveis, {
      foreignKey: 'nivel_id'   
    });

    }
  }
  turmas.init({
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'turmas',
    paranoid: true,
  });
  return turmas;
};