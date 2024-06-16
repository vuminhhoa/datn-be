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
      { name: 'Trưởng phòng Phòng Vật tư' },
      { name: 'Trưởng phòng Vật tư' }
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
      { name: 'Trưởng phòng Vật tư' },
      { name: 'Trưởng phòng Phòng Vật tư' }
    );
  },
};
