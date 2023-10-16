const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UploadLineItems = sequelize.define('UploadLineItems', {
  line_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  upload_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},{
  tableName: 'upload_lineitems',
});

module.exports = UploadLineItems;
