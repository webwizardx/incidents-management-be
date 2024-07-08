'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT count(*) FROM roles',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (count > 1) {
      return;
    }

    const roles = ['ADMIN', 'TECHNICIAN', 'USER'];

    const records = [];

    for (const role of roles) {
      records.push({
        name: role,
      });
    }

    return queryInterface.bulkInsert('roles', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
