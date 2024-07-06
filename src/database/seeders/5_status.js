'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT count(*) FROM status',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (count > 1) {
      return;
    }

    const status = ['open', 'progress', 'closed'];

    const records = [];

    for (const name of status) {
      records.push({
        name,
      });
    }

    return queryInterface.bulkInsert('status', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('status', null, {});
  },
};
