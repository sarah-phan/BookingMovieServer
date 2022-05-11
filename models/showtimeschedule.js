'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowtimeSchedule extends Model {
    static associate({
      Movie, 
      CinemaRoom, 
      Ticket,
      ListSeat
    }) {
      this.belongsTo(Movie, {
        foreignKey: 'movieId',
        as: 'movie'
      })
      this.belongsTo(CinemaRoom, {
        foreignKey: 'roomId',
        as: 'room'
      })
      this.hasOne(Ticket, {
        foreignKey: 'showtimeId'
      })
      this.hasMany(ListSeat, {
        foreignKey: 'showtimeId'
      })
    }
  }
  ShowtimeSchedule.init({
    timeShow: DataTypes.DATE,
    price: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShowtimeSchedule',
  });
  return ShowtimeSchedule;
};