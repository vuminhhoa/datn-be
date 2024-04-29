'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('Permissions', [
      {
        alias: 'dashboardRead',
        name: 'Xem bảng điều khiển',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'departmentRead',
        name: 'Xem phòng ban',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'userRead',
        name: 'Xem người dùng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'tenderRead',
        name: 'Xem thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'equipmentRead',
        name: 'Xem thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'departmentCreate',
        name: 'Tạo phòng ban',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'departmentUpdate',
        name: 'Cập nhật phòng ban',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'departmentDelete',
        name: 'Xóa phòng ban',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'profileSetting',
        name: 'Cài đặt hồ sơ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'systemSetting',
        name: 'Cài đặt hệ thống',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'userCreate',
        name: 'Tạo người dùng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        alias: 'userUpdate',
        name: 'Cập nhật người dùng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'userDelete',
        name: 'Xóa người dùng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'tenderCreate',
        name: 'Tạo thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        alias: 'tenderUpdate',
        name: 'Cập nhật thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'tenderDelete',
        name: 'Xóa thầu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'equipmentCreate',
        name: 'Tạo thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        alias: 'equipmentUpdate',
        name: 'Cập nhật thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'equipmentDelete',
        name: 'Xóa thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alias: 'equipmentImport',
        name: 'Nhập thiết bị',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
