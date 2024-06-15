'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Permissions', [
      {
        name: 'Tạo khoa phòng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem chi tiết khoa phòng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cập nhật khoa phòng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xóa khoa phòng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
