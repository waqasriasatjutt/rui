const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    suburb: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    postCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: "orders", // Specify the actual table name in your database
  }
);

// models/Upload.js
const Upload = sequelize.define(
  "Upload",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    filesize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "uploads", // Specify the actual table name in your database
  }
);

// models/OrderUpload.js
const OrderUpload = sequelize.define(
  "OrderUpload",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Upload_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "ordersUpload", // Specify the actual table name in your database
  }
);

Order.belongsToMany(Upload, { through: OrderUpload });
Upload.belongsToMany(Order, { through: OrderUpload });

module.exports = { Order, Upload, OrderUpload };
