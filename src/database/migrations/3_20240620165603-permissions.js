'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('permissions', {
      action: Sequelize.TEXT,
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      subject: Sequelize.TEXT,
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('permissions');
  },
};
