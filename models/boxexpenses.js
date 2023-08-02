'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoxExpenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoxExpenses.init({
    boxId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BoxExpenses',
  });
  return BoxExpenses;
};