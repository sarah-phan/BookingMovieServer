'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaSystem extends Model {
    static associate({
      CinemaLogo, 
      Cinema, 
      Movie,
      Movie_Cinema
    }) {
      this.hasMany(CinemaLogo, {
        foreignKey: 'systemId',
        as: 'Logo'
      })
      this.hasMany(Cinema, {
        foreignKey: 'systemId',
        as: 'cinemas'
      })
      this.belongsToMany(Movie, {
        through: Movie_Cinema,
        as: 'movies'
      })
    }
  }
  CinemaSystem.init({
    systemName: DataTypes.STRING,
    alias: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CinemaSystem',
  });
  return CinemaSystem;
};