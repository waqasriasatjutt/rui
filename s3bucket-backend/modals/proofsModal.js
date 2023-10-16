const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UploadProofs = require('./uploadProofs');
const Uploads = require('./uploads');

const Proofs = sequelize.define('Proofs', {
  line_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  proof_number: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},{
  tableName: 'proofs',
});
// Define the many-to-many association with Uploads through UploadProofs
Proofs.associate = (models) => {
  Proofs.belongsToMany(models.Uploads, {
    through: 'UploadProofs', // Name of the join table
    foreignKey: 'proof_id',
  });
};
module.exports = Proofs;
