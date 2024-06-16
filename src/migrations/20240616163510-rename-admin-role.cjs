'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.bulkUpdate(
      'Roles',
      { name: 'Trưởng phòng Vật tư' },
      { name: 'Quản trị viên' }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.bulkUpdate(
      'Roles',
      { name: 'Quản trị viên' },
      { name: 'Trưởng phòng Vật tư' }
    );
  },
};
