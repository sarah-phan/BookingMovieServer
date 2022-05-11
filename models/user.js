'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      UserRole, 
      Avatar,
      Ticket,
      ListSeat
    }) {
      this.belongsTo(UserRole, {
        foreignKey: "roleId"
      });
      this.hasMany(Avatar, {
        foreignKey: "userId",
        as: "Avatar"
      })
      this.hasOne(Ticket, {
        foreignKey: 'userId'
      })
      this.hasMany(ListSeat, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    roleId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};