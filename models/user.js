'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({UserRole}) {
      this.belongsTo(UserRole, {
        foreignKey: "roleId"
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