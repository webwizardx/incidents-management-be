'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('roles', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: Sequelize.TEXT,
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('roles');
  },
};
