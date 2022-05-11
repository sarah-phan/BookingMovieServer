'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate({
      MovieImages, 
      ShowtimeSchedule, 
      CinemaSystem,
      Movie_Cinema,
      Ticket
    }) {
      this.hasMany(MovieImages, {
        foreignKey: "movieId",
        as: "Image"
      })
      this.hasMany(ShowtimeSchedule, {
        foreignKey: 'movieId',
      })
      this.belongsToMany(CinemaSystem, {
        through: Movie_Cinema
      })
      this.hasOne(Ticket, {
        foreignKey: 'movieId'
      })
    }
  }
  Movie.init({
    name: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.STRING,
    trailer: DataTypes.STRING,
    startShowing: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    hot: DataTypes.BOOLEAN,
    isShown: DataTypes.BOOLEAN,
    comingSoon: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};