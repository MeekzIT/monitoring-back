"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Info2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Info2.init(
    {
      ownerID: DataTypes.INTEGER,
      first: DataTypes.STRING,
      second: DataTypes.STRING,
      value1: DataTypes.STRING,
      value2: DataTypes.STRING,
      time1: DataTypes.STRING,
      time2: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Info2",
    }
  );
  return Info2;
};
