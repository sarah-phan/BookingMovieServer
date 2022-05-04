'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieImages extends Model {
    static associate({Movie}) {
      this.belongsTo(Movie, {
        foreignKey: 'movieId'
      })
    }
  }
  MovieImages.init({
    movieId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MovieImages',
  });
  return MovieImages;
};