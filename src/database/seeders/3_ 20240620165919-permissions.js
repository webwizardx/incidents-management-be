'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT count(*) FROM permissions',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (count > 1) {
      return;
    }

    const permissions = [
      {
        action: 'manage',
        subject: 'all',
      },
      {
        action: 'read',
        subject: 'roles',
      },
      {
        action: 'read',
        subject: 'users',
      },
      {
        action: 'update',
        subject: 'users',
      },
    ];

    const records = [];

    for (const permission of permissions) {
      records.push({
        action: permission.action,
        subject: permission.subject,
      });
    }

    return queryInterface.bulkInsert('permissions', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('permissions', null, {});
  },
};
