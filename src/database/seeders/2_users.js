/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const bcrypt = require('bcrypt');
const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
/** @type {import('@faker-js/faker').Faker} */
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
        created_at: new Date(),
        email: 'admin@mercantilseguros.com',
        first_name: 'Jonathan',
        last_name: 'Admin',
        password: await bcrypt.hash('password', 10),
        role_id: 1,
      },
      {
        created_at: new Date(),
        email: 'tecnico@mercantilseguros.com',
        first_name: 'Jonathan',
        last_name: 'Tecnico',
        password: await bcrypt.hash('password', 10),
        role_id: 2,
      },
      {
        created_at: new Date(),
        email: 'usuario@mercantilseguros.com',
        first_name: 'Jonathan',
        last_name: 'Usuario',
        password: await bcrypt.hash('password', 10),
        role_id: 3,
      },
    ];

    for (let i = 0; i < 100; ++i) {
      const first_name = faker.person.firstName().split(' ')[0];
      const last_name = faker.person.lastName().split(' ')[0];
      users.push({
        created_at: new Date(),
        email: faker.internet
          .email({
            allowSpecialCharacters: false,
            firstName: first_name,
            lastName: last_name,
            provider: 'mercantilseguros.com',
          })
          .toLocaleLowerCase(),
        first_name,
        last_name,
        password: await bcrypt.hash('password', 10),
        role_id: i & 1 ? 2 : 3,
      });
    }

    return queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
