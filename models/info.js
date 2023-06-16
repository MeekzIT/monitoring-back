"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Info.init(
    {
      ownerID: DataTypes.INTEGER,
      functionId: DataTypes.STRING, // voda, wax, ...
      enginePower: DataTypes.STRING,
      electricPrice: DataTypes.STRING,
      waterPrice: DataTypes.STRING,
      waterPerMinute: DataTypes.STRING,
      modeValuePerLitre: DataTypes.STRING,
      PrcentOfRegulator: DataTypes.STRING,
      PrcetOfModeValueFirst: DataTypes.STRING,
      PrcetOfModeValueSecond: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Info",
    }
  );
  return Info;
};
