const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const UploadOrder = sequelize.define('UploadOrder', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
  },
  name: {
    type: DataTypes.STRING(255),
  },
  address1: {
    type: DataTypes.STRING(255),
  },
  address2: {
    type: DataTypes.STRING(255),
  },
  suburb: {
    type: DataTypes.STRING(255),
  },
  postcode: {
    type: DataTypes.STRING(255),
  },
  state: {
    type: DataTypes.STRING(255),
  },
  // Add more fields as needed
});

module.exports = UploadOrder;