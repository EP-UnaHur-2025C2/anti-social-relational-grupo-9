'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Follows', {
      followerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        references: {model:'Users', key:'id'},
        onDelete: 'CASCADE'
      },
      followedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        references: {model:'Users', key:'id'},
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Follows');
  }
};