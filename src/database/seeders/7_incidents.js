'use strict';
const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
/** @type {import('@faker-js/faker').Faker} */
module.exports = {
  async up(queryInterface) {
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT count(*) FROM incidents',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (count > 1) {
      return;
    }

    const records = [];

    for (let i = 0; i < 3; ++i) {
      records.push({
        category_id: 1,
        owner_id: 1,
        status_id: 1,
        title: faker.word.words(10),
      });
    }

    return queryInterface.bulkInsert('incidents', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('incidents', null, {});
  },
};
