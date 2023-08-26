'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Info2s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerID: Sequelize.INTEGER,
      first: {
        type: Sequelize.STRING
      },
      second: {
        type: Sequelize.STRING
      },
      value1: {
        type: Sequelize.STRING
      },
      value2: {
        type: Sequelize.STRING
      },
      time1: {
        type: Sequelize.STRING
      },
      time2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Info2s');
  }
};