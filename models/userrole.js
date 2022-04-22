'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate({User}) {
      this.hasMany(User, {
        foreignKey: "roleId"
      })
    }
  }
  UserRole.init({
    roleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};