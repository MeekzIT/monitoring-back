"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Infos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mode: Sequelize.INTEGER,
      ownerID: Sequelize.INTEGER,
      functionId: Sequelize.STRING, // voda, wax, ...
      enginePower: Sequelize.STRING,
      electricPrice: Sequelize.STRING,
      waterPrice: Sequelize.STRING,
      waterPerMinute: Sequelize.STRING,
      modeValuePerLitre: Sequelize.STRING,
      PrcentOfRegulator: Sequelize.STRING,
      PrcetOfModeValueFirst: Sequelize.STRING,
      PrcetOfModeValueSecond: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Infos");
  },
};
