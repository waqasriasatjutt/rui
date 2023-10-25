const sequelize = require("../config/database");
const {Sequelize} = require("sequelize");
exports.getOrders = async (req, res) => {
  try {
    const sqlQuery = `
      SELECT o.*, u.*, ou.*
      FROM orders AS o
      LEFT JOIN ordersUpload AS ou ON o.id = ou.order_id
      LEFT JOIN uploads AS u ON ou.Upload_id = u.id;
    `;

    const orders = await sequelize.query(sqlQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    const groupedOrders = {};
    orders.forEach((order) => {
      const orderId = order.order_id;

      if (!groupedOrders[orderId]) {
        // Create a new group for this order_id
        groupedOrders[orderId] = {
          id: orderId,
          name: order.name,
          address1: order.address1,
          address2: order.address2,
          email: order.email,
          suburb: order.suburb,
          postCode: order.postCode,
          state: order.state,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          files: [],
        };
      }

      // Add the current file data to the order
      groupedOrders[orderId].files.push({
        upload_id: order.upload_id,
        url: order.url,
        filesize: order.filesize,
        qty: order.qty,
      });
    });

    // Convert the grouped orders to an array
    const result = Object.values(groupedOrders);

    res.status(200).json(result);
  } catch (error) {
    console.error('Database query error: ' + error.stack);
    return res.status(502).json({ message: 'Internal server error' });
  }
};
