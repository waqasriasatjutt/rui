const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProofStatus = sequelize.define('ProofStatus', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
},{
  tableName: 'proof_statuses',
});

module.exports = ProofStatus;
