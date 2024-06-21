'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('roles_has_permissions', {
      id: {
        autoIncrement: true,
        defaultValue: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      permissionId: {
        field: 'permission_id',
        references: {
          key: 'id',
          model: 'permissions',
        },
        type: Sequelize.BIGINT,
      },
      role_id: {
        field: 'role_id',
        references: {
          key: 'id',
          model: 'roles',
        },
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('roles_has_permissions');
  },
};
