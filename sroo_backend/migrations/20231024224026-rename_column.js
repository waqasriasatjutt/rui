'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tables = ['ordersUpload']; // Add your table names
    const columnsToRename = [
      { oldName: 'Upload_id', newName: 'upload_id' },
      // Add more column rename objects as needed
    ];

    for (const table of tables) {
      for (const { oldName, newName } of columnsToRename) {
        await queryInterface.renameColumn(table, oldName, newName, {});
        console.log(`Renamed ${table}.${oldName} to ${table}.${newName}`);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    const tables = ['ordersUpload'];
  const columnsToRename = [
    { oldName: 'Upload_id', newName: 'upload_id' },
    // Add more column rename objects as needed
  ];

  for (const table of tables) {
    for (const { oldName, newName } of columnsToRename) {
      await queryInterface.renameColumn(table, oldName, newName, {});
      console.log(`Rolled back renaming ${table}.${newName} to ${table}.${oldName}`);
    }
  }
  }
};
