'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_Order: {
        type: Sequelize.STRING
      },
      id_Product: {
        type: Sequelize.STRING
      },
      id_Product_detail: {
        type: Sequelize.STRING
      },
      id_Promotion: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      totalDetail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_details');
  }
};