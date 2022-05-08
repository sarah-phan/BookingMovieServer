'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaSystem extends Model {
    static associate({CinemaLogo, Cinema}) {
      this.hasMany(CinemaLogo, {
        foreignKey: 'systemId',
        as: 'Logo'
      })
      this.hasMany(Cinema, {
        foreignKey: 'systemId'
      })
    }
  }
  CinemaSystem.init({
    systemName: DataTypes.STRING,
    alias: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CinemaSystem',
  });
  return CinemaSystem;
};