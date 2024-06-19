'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Permissions', [
      {
        name: 'Phê duyệt hoạt động mua sắm đấu thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem tất cả thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem tất cả hoạt động mua sắm đấu thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
