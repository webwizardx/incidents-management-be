'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('incidents', {
      assignedTo: {
        field: 'assigned_to',
        references: {
          key: 'id',
          model: 'users',
        },
        type: Sequelize.BIGINT,
      },
      categoryId: {
        field: 'category_id',
        references: {
          key: 'id',
          model: 'categories',
        },
        type: Sequelize.BIGINT,
      },
      closedAt: {
        allowNull: true,
        field: 'closed_at',
        type: Sequelize.DATE,
      },
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
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      ownerId: {
        field: 'owner_id',
        references: {
          key: 'id',
          model: 'users',
        },
        type: Sequelize.BIGINT,
      },
      statusId: {
        field: 'status_id',
        references: {
          key: 'id',
          model: 'status',
        },
        type: Sequelize.BIGINT,
      },
      title: Sequelize.TEXT,
      updatedAt: {
        allowNull: true,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('incidents');
  },
};
