'use strict';

const { permission } = require('process');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT count(*) FROM roles_has_permissions',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (count > 1) {
      return;
    }

    const rolesAndPermissions = [
      {
        action: 'manage',
        roles: [1],
        subject: 'all',
      },
      {
        action: 'read',
        roles: [2, 3],
        subject: 'users',
      },
      {
        action: 'update',
        roles: [2, 3],
        subject: 'users',
      },
    ];

    const records = [];

    for (const roleAndPermission of rolesAndPermissions) {
      const [permission] = await queryInterface.sequelize.query(
        'SELECT * FROM permissions WHERE action = :action AND subject = :subject',
        {
          replacements: roleAndPermission,
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      for (const roleId of roleAndPermission.roles) {
        records.push({
          permission_id: permission?.id,
          role_id: roleId,
        });
      }
    }

    return queryInterface.bulkInsert('roles_has_permissions', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('roles_has_permissions', null, {});
  },
};
