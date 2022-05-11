'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    static associate({ 
      CinemaSystem, 
      CinemaRoom,
    }) {
      this.belongsTo(CinemaSystem, {
        foreignKey: 'systemId'
      })
      this.hasMany(CinemaRoom, {
        foreignKey: 'cinemaId',
        as: 'rooms'
      })
    }

  }
  Cinema.init({
    cinemaName: DataTypes.STRING,
    address: DataTypes.STRING,
    alias: DataTypes.STRING,
    systemId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cinema',
  });
  return Cinema;
};