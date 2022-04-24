'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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