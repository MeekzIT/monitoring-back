"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Owner.init(
    {
      firstName: DataTypes.STRING,
      deviceOwner: DataTypes.INTEGER,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      token: DataTypes.STRING,
      subscribe: DataTypes.BOOLEAN,
      lastPay: DataTypes.STRING,
      variant: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Owner",
    }
  );

  let Country = sequelize.define("Country");
  let User = sequelize.define("User");
  let Box = sequelize.define("Box");

  Owner.belongsTo(User, {
    foreignKey: "id",
  });

  Owner.belongsTo(Country, {
    foreignKey: "countryId",
  });

  Owner.hasMany(Box, {
    foreignKey: "ownerId",
  });

  return Owner;
};
