/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const bcrypt = require('bcrypt');
const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT count(*) FROM users',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (count > 1) {
      return;
    }

    const users = [
      {
        createdAt: new Date(),
        email: 'jonathanalvarado1407@gmail.com',
        firstName: 'Jonathan',
        lastName: 'Alvarado',
        password: await bcrypt.hash('password', 10),
        userId: faker.string.uuid(),
      },
    ];

    for (let i = 0; i < 10; ++i) {
      users.push({
        createdAt: new Date(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: await bcrypt.hash('password', 10),
        userId: faker.string.uuid(),
      });
    }

    return queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
