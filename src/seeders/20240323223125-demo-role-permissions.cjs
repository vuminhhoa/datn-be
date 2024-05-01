'use strict';
/** @type {import('sequelize-cli').Migration} */

const adminFullPermission = () => {
  const fullPermissions = [];
  for (let i = 1; i <= 16; i++) {
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
    return queryInterface.bulkInsert('Role_Permissions', fullPermissions);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Role_Permissions', null, {});
  },
};
