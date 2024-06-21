'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('roles', {
      id: {
        defaultValue: Sequelize.DataTypes.BIGINT,
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
