'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowtimeSchedule extends Model {
    static associate({Movie, CinemaRoom}) {
      this.belongsTo(Movie, {
        foreignKey: 'movieId',
        as: 'movie'
      })
      this.belongsTo(CinemaRoom, {
        foreignKey: 'roomId',
        as: 'room'
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