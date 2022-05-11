'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate({Movie, ShowtimeSchedule, CinemaRoom, ListSeat, User}) {
      this.belongsTo(Movie, {
        foreignKey: 'movieId',
        as: 'movie'
      })
      this.belongsTo(ShowtimeSchedule, {
        foreignKey: 'showtimeId',
        as: 'showtime'
      })
      this.belongsTo(CinemaRoom, {
        foreignKey: 'cinemaRoomId',
        as: 'rooms'
      })
      this.belongsTo(ListSeat, {
        foreignKey: 'seatId',
        as: 'seat'
      })
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'account'
      })
    }
  }
  Ticket.init({
    movieId: DataTypes.INTEGER,
    showtimeId: DataTypes.INTEGER,
    cinemaRoomId: DataTypes.INTEGER,
    seatId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};