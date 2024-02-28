'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnerSystem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OwnerSystem.init({
    ownerId: DataTypes.INTEGER,
    api: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    currencyCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OwnerSystem',
  });
  return OwnerSystem;
};