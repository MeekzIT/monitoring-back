"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Box.init(
    {
      name: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
      geolocation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Box",
    }
  );

  let Owner = sequelize.define("Owner");
  let Item = sequelize.define("Item");

  Box.belongsTo(Owner, {
    foreignKey: "id",
  });

  Box.hasMany(Item, {
    foreignKey: "p5",
  });

  return Box;
};
