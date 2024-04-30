'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Permissions', [
      {
        name: 'Xem trang tổng quan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tạo thành viên',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem chi tiết thành viên',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cập nhật thành viên',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xóa thành viên',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tạo thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem chi tiết thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cập nhật thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xóa thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tạo hoạt động mua sắm đấu thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem chi tiết hoạt động mua sắm đấu thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cập nhật hoạt động mua sắm đấu thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xóa hoạt động mua sắm đấu thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tạo vai trò',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xem chi tiết vai trò',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cập nhật vai trò',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xóa vai trò',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
