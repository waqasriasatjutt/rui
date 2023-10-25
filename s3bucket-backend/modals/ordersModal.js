const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  order_number: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  order_status: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  payment_status: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [], // Set an empty array as default value
    allowNull: false,
  },
  active_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
},{
  tableName: 'orders',
});

module.exports = Order;