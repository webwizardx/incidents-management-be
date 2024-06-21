'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      createdAt: {
        defaultValue: new Date(),
        field: 'created_at',
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        field: 'deleted_at',
        type: Sequelize.DATE,
      },
      email: {
        type: Sequelize.TEXT,
        unique: true,
      },
      id: {
        defaultValue: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      firstName: {
        field: 'first_name',
        type: Sequelize.TEXT,
      },
      lastName: {
        field: 'last_name',
        type: Sequelize.TEXT,
      },
      password: Sequelize.TEXT,
      roleId: {
        field: 'role_id',
        references: {
          key: 'id',
          model: 'roles',
        },
        type: Sequelize.BIGINT,
      },
      updatedAt: {
        allowNull: true,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
