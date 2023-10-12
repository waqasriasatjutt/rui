const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LineItem = sequelize.define('LineItem', {
  order_number: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
},{
  tableName: 'line_items',
});

module.exports = LineItem;
