const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UploadTypes = sequelize.define('UploadTypes', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
},{
  tableName: 'upload_types',
});

module.exports = UploadTypes;
