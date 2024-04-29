'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
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
      alias: 'readProfile',
      name: 'Xem thông tin cá nhân',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alias: 'updateProfile',
      name: 'Sửa thông tin cá nhân',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  return queryInterface.bulkDelete('Permissions', null, {});
}
