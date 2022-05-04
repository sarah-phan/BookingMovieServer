'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaLogo extends Model {
    static associate({CinemaSystem}) {
      this.belongsTo(CinemaSystem, {
        foreignKey: 'systemId'
      })
    }
  }
  CinemaLogo.init({
    url: DataTypes.STRING,
    isActive: DataTypes.STRING,
    systemId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CinemaLogo',
  });
  return CinemaLogo;
};