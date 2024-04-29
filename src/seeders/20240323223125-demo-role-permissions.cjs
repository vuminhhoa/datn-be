'use strict';
/** @type {import('sequelize-cli').Migration} */

const adminFullPermission = () => {
  const fullPermissions = [];
  for (let i = 1; i <= 20; i++) {
    fullPermissions.push({
      RoleId: 1,
      PermissionId: i,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  for (let i = 1; i <= 5; i++) {
    fullPermissions.push({
      RoleId: 2,
      PermissionId: i,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return fullPermissions;
};

const fullPermissions = adminFullPermission();

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
    return queryInterface.bulkInsert('Role_Permissions', fullPermissions);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Role_Permissions', null, {});
  },
};
