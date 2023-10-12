const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderStatus = sequelize.define('OrderStatus', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
},{
  tableName: 'order_status',
});

module.exports = OrderStatus;
