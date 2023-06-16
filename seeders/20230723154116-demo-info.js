"use strict";
const data = require("../mock/info");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Infos", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Infos", null, {});
  },
};
