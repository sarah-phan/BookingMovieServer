'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaRoom extends Model {
    static associate({
      Cinema, 
      ShowtimeSchedule,
      ListSeat,
      Ticket
    }) {
      this.belongsTo(Cinema, {
        foreignKey: 'cinemaId',
      })
      this.hasMany(ShowtimeSchedule, {
        foreignKey: 'roomId',
        as: 'showtimes'
      })
      this.hasMany(ListSeat, {
        foreignKey: 'roomId',
        as: 'seats'
      })
      this.hasOne(Ticket, {
        foreignKey: 'cinemaRoomId'
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