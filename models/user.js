"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      subscribe: DataTypes.BOOLEAN,
      lastPay: DataTypes.STRING,
      variant: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      adminId: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  let Country = sequelize.define("Country");
  let Owner = sequelize.define("Owner");

  User.belongsTo(Country, {
    foreignKey: "countryId",
  });

  User.hasMany(Owner, {
    foreignKey: "userId",
  });

  return User;
};
