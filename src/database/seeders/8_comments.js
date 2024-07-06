'use strict';
const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
/** @type {import('@faker-js/faker').Faker} */
module.exports = {
  async up(queryInterface) {
    const incidents = await queryInterface.sequelize.query(
      'SELECT * FROM incidents',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const records = [];
    for (let i = 0; i < incidents.length; ++i) {
      const incident = incidents[i];
      for (let j = 1; j < 3; ++j) {
        records.push({
          description: faker.lorem.paragraph(),
          incident_id: incident.id,
          user_id: j,
        });
      }
    }

    return queryInterface.bulkInsert('comments', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
