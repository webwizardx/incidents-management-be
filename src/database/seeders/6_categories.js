'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT count(*) FROM categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (count > 1) {
      return;
    }

    const categories = ['issue'];

    const records = [];

    for (const name of categories) {
      records.push({
        name,
      });
    }

    return queryInterface.bulkInsert('categories', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
