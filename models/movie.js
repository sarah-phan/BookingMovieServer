'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate({MovieImages}) {
      this.hasMany(MovieImages, {
        foreignKey: "movieId",
        as: "Image"
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