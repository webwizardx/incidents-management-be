'use strict';
const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
/** @type {import('@faker-js/faker').Faker} */
module.exports = {
  async up(queryInterface) {
    const incidents = await queryInterface.sequelize.query(
      'SELECT * FROM incidents ORDER BY id ASC',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const comments = [
      // No tengo permisos
      [
        'No puedo acceder a ciertas funciones del sistema. Necesito realizar una tarea específica.',
        'Revisaremos tus permisos y te otorgaremos los necesarios para que puedas realizar la tarea.',
      ],
      // No tengo accesos
      [
        'No puedo ingresar a la plataforma con mis credenciales.',
        'Verificaremos tu usuario y contraseña. Asegúrate de que estén escritos correctamente y que tu cuenta esté activa.',
      ],
      // No puedo acceder a la VPN
      [
        'La conexión a la VPN se interrumpe constantemente.',
        'Verificaremos la configuración de tu dispositivo y la conexión a internet. También revisaremos el estado del servidor VPN.',
      ],
      // Error en cotización
      [
        'Los cálculos de la cotización no coinciden con los valores esperados.',
        'Revisaremos los datos ingresados y los cálculos realizados. Es posible que haya un error en la configuración de los productos o servicios.',
      ],

      // Error en la página
      [
        'Algunos elementos de la página no cargan correctamente.',
        'Verificaremos la conexión a internet, el caché del navegador y la compatibilidad del navegador con la página.',
      ],

      // Error en el login
      [
        'El sistema me redirige constantemente a la página de inicio de sesión.',
        'Verificaremos tus cookies y el almacenamiento local del navegador. Es posible que haya un conflicto con alguna extensión.',
      ],

      // Error en la compra, Error en el pago
      [
        'Mi pago ha sido rechazado.',
        'Verifica los datos de tu tarjeta de crédito y comunícate con tu banco para confirmar que no haya ningún bloqueo.',
      ],
      // Error en la compra, Error en el pago
      [
        'No he recibido la confirmación de compra.',
        'Verificaremos el estado de tu pedido y te enviaremos una confirmación por correo electrónico.',
      ],

      // Error generando póliza
      [
        'Al generar una póliza, aparece un mensaje de error.',
        'Verificaremos los datos ingresados y la configuración del sistema. Es posible que falte alguna información o que haya un error en la base de datos.',
      ],

      // No puedo realizar la impresión de los reportes
      [
        'El reporte se genera en blanco.',
        'Verificaremos la configuración de la impresora, los permisos de impresión y la compatibilidad del formato del reporte.',
      ],
      // --------------------------------------------------------------
      // No tengo permisos
      [
        'No puedo acceder a ciertas funciones del sistema. Necesito realizar una tarea específica.',
        'Revisaremos tus permisos y te otorgaremos los necesarios para que puedas realizar la tarea.',
      ],
      // No tengo accesos
      [
        'No puedo ingresar a la plataforma con mis credenciales.',
        'Verificaremos tu usuario y contraseña. Asegúrate de que estén escritos correctamente y que tu cuenta esté activa.',
      ],
      // No puedo acceder a la VPN
      [
        'La conexión a la VPN se interrumpe constantemente.',
        'Verificaremos la configuración de tu dispositivo y la conexión a internet. También revisaremos el estado del servidor VPN.',
      ],
      // Error en cotización
      [
        'Los cálculos de la cotización no coinciden con los valores esperados.',
        'Revisaremos los datos ingresados y los cálculos realizados. Es posible que haya un error en la configuración de los productos o servicios.',
      ],

      // Error en la página
      [
        'Algunos elementos de la página no cargan correctamente.',
        'Verificaremos la conexión a internet, el caché del navegador y la compatibilidad del navegador con la página.',
      ],

      // Error en el login
      [
        'El sistema me redirige constantemente a la página de inicio de sesión.',
        'Verificaremos tus cookies y el almacenamiento local del navegador. Es posible que haya un conflicto con alguna extensión.',
      ],
      // --------------------------------------------------------------
      // No tengo permisos
      [
        'No puedo acceder a ciertas funciones del sistema. Necesito realizar una tarea específica.',
        'Revisaremos tus permisos y te otorgaremos los necesarios para que puedas realizar la tarea.',
      ],
      // No tengo accesos
      [
        'No puedo ingresar a la plataforma con mis credenciales.',
        'Verificaremos tu usuario y contraseña. Asegúrate de que estén escritos correctamente y que tu cuenta esté activa.',
      ],
      // No puedo acceder a la VPN
      [
        'La conexión a la VPN se interrumpe constantemente.',
        'Verificaremos la configuración de tu dispositivo y la conexión a internet. También revisaremos el estado del servidor VPN.',
      ],
    ];
    const records = [];
    for (let i = 0; i < incidents.length; ++i) {
      const incident = incidents[i];
      for (let j = 1; j < 3; ++j) {
        records.push({
          content: comments[i][j - 1],
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
