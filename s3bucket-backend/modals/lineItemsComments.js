const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LineItemsComments = sequelize.define('LineItemsComments', {
  line_item_id: {
    type: DataTypes.INTEGER,
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
  tableName: 'lineitem_comments',
});

module.exports = LineItemsComments;
