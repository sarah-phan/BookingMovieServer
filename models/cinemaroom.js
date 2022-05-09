'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaRoom extends Model {
    static associate({
      Cinema, 
      ShowtimeSchedule
    }) {
      this.belongsTo(Cinema, {
        foreignKey: 'cinemaId',
      })
      this.hasMany(ShowtimeSchedule, {
        foreignKey: 'roomId',
        as: 'showtimes'
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