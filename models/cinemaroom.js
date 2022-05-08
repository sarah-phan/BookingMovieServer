'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaRoom extends Model {
    static associate({Cinema}) {
      this.belongsTo(Cinema, {
        foreignKey: 'cinemaId',
        as: 'Cinema'
      })
    }
  }
  CinemaRoom.init({
    roomName: DataTypes.STRING,
    cinemaId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CinemaRoom',
  });
  return CinemaRoom;
};