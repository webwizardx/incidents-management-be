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

    const incidentTitles = [
      'No tengo permisos',
      'No tengo accessos',
      'No puedo acceder a la VPN',
      'Error en cotización',
      'Error en la página',
      'Error en el login',
      'Error en la compra',
      'Error en el pago',
      'Error generando póliza',
      'No puedo realizar la impresión de los reportes',
    ];

    const records = [];

    for (let i = 0; i < 10; ++i) {
      records.push({
        assigned_to: 2,
        category_id: i & 1 ? 1 : 2,
        owner_id: 1,
        status_id: 1,
        title: incidentTitles[i],
      });
    }
    for (let i = 0; i < 6; ++i) {
      records.push({
        assigned_to: 5,
        category_id: i & 1 ? 3 : 4,
        owner_id: 1,
        status_id: 2,
        title: incidentTitles[i],
      });
    }
    for (let i = 0; i < 3; ++i) {
      records.push({
        assigned_to: 7,
        category_id: 5,
        owner_id: 1,
        status_id: 3,
        title: incidentTitles[i],
      });
    }

    return queryInterface.bulkInsert('incidents', records);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('incidents', null, {});
  },
};
