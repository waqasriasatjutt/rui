const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UploadProofs = sequelize.define('UploadProofs', {
  proof_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  upload_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},{
  tableName: 'upload_proofs',
});

module.exports = UploadProofs;
