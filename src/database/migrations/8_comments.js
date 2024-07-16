'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
      content: Sequelize.TEXT,
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
      imageUrl: {
        allowNull: true,
        field: 'image_url',
        type: Sequelize.TEXT,
      },
      incidentId: {
        field: 'incident_id',
        references: {
          key: 'id',
          model: 'incidents',
        },
        type: Sequelize.BIGINT,
      },
      updatedAt: {
        allowNull: true,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
      userId: {
        field: 'user_id',
        references: {
          key: 'id',
          model: 'users',
        },
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('comments');
  },
};
