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
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'Trưởng phòng Vật tư',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nhân viên',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Người dùng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quản lý',
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
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
