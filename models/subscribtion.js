'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribtion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscribtion.init({
    ownerId: DataTypes.INTEGER,
    mdOrder: DataTypes.STRING,
    amount: DataTypes.STRING,
    status: DataTypes.STRING,
    cart: DataTypes.STRING,
    name: DataTypes.STRING,
    year: DataTypes.STRING,
    month: DataTypes.STRING,
    cvv: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscribtion',
  });
  return Subscribtion;
};