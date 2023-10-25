'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Removing existing 'createdAt' and 'updatedAt' columns from the 'Order' table
    await queryInterface.removeColumn('orders', 'createdAt');
    await queryInterface.removeColumn('orders', 'updatedAt');

    // Removing existing 'createdAt' and 'updatedAt' columns from the 'Upload' table
    await queryInterface.removeColumn('uploads', 'createdAt');
    await queryInterface.removeColumn('uploads', 'updatedAt');

    // Removing existing 'createdAt' and 'updatedAt' columns from the 'OrderUpload' table
    await queryInterface.removeColumn('ordersUpload', 'createdAt');
    await queryInterface.removeColumn('ordersUpload', 'updatedAt');

    // Adding 'createdAt' and 'updatedAt' columns to the 'Order' table
    await queryInterface.addColumn('orders', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('orders', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    // Adding 'createdAt' and 'updatedAt' columns to the 'Upload' table
    await queryInterface.addColumn('uploads', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('uploads', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    // Adding 'createdAt' and 'updatedAt' columns to the 'OrderUpload' table
    await queryInterface.addColumn('ordersUpload', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('ordersUpload', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing 'createdAt' and 'updatedAt' columns from the tables
    await queryInterface.removeColumn('orders', 'createdAt');
    await queryInterface.removeColumn('orders', 'updatedAt');
    await queryInterface.removeColumn('uploads', 'createdAt');
    await queryInterface.removeColumn('uploads', 'updatedAt');
    await queryInterface.removeColumn('ordersUpload', 'createdAt');
    await queryInterface.removeColumn('ordersUpload', 'updatedAt');
  },
};
