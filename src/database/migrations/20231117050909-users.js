'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      createdAt: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      email: {
        type: Sequelize.TEXT,
        unique: true,
      },
      firstName: Sequelize.TEXT,
      lastName: Sequelize.TEXT,
      password: Sequelize.TEXT,
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      userId: {
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
