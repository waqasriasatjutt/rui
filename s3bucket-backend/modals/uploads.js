const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Proofs = require('./proofsModal');
const UploadProofs = require('./uploadProofs');

const Uploads = sequelize.define('Uploads', {
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  upload_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  line_item_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},{
  tableName: 'uploads',
});
// Define the many-to-many association with Proofs through UploadProofs
Uploads.associate = (models) => {
  Uploads.belongsToMany(models.Proofs, {
    through: 'UploadProofs', // Name of the join table
    foreignKey: 'upload_id',
  });
};
module.exports = Uploads;
