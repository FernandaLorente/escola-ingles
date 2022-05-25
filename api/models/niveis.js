'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class niveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

     niveis.hasMany(models.turmas, {
      foreignKey: 'nivel_id'
    });
    
    }
  }
  niveis.init({
    descr_nivel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'niveis',
    paranoid: true,
  });
  return niveis;
};