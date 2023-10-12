const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  order_number: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  comment_by: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(255),
  },
  name: {
    type: DataTypes.STRING(255),
  },
},{
  tableName: 'order_comments',
});

module.exports = Comment;
