"use strict";
const data = require("../mock/ownerSystem");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("OwnerSystems", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OwnerSystems", null, {});
  },
};
