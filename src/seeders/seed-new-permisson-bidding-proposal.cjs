'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Permissions', [
      {
        name: 'Tạo đề xuất hoạt động mua sắm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem chi tiết đề xuất hoạt động mua sắm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cập nhật đề xuất hoạt động mua sắm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xóa đề xuất hoạt động mua sắm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Phê duyệt đề xuất hoạt động mua sắm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem tất cả đề xuất hoạt động mua sắm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
