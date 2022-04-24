'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    static associate({User}) {
      this.belongsTo(User, {
        foreignKey: "userId"
      })
    }
  }
  Avatar.init({
    url: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Avatar',
  });
  return Avatar;
};