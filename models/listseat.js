'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListSeat extends Model {
    static associate({
      CinemaRoom, 
      Ticket,
      User,
      ShowtimeSchedule
    }) {
      this.belongsTo(CinemaRoom, {
        foreignKey: 'roomId'
      })
      this.hasOne(Ticket, {
        foreignKey: 'seatId'
      })
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'account'
      })
      this.belongsTo(ShowtimeSchedule, {
        foreignKey: 'showtimeId',
      })
    }
  }
  ListSeat.init({
    seatName: DataTypes.STRING,
    seatType: DataTypes.STRING,
    orderNumber: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    isBooked: DataTypes.BOOLEAN,
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    showtimeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListSeat',
  });
  return ListSeat;
};