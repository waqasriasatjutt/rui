const Order = require("../modals/ordersModal");
const OrderStatus = require("../modals/orderStatusModal");

exports.getOrders = async (req, res) => {
  try {
    // Fetch all order statuses from the database
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
// Function to fetch the status by name
exports.getOrdersById = async (req, res) => {
  const orderNumber = req.params.id;
  try {
    const order = await Order.findOne({
      where: {
        order_number: orderNumber, // Update with the desired status name
      },
    });
    res.status(200).json(order);
  } catch (err) {
    console.error("Error fetching status:", err);
    throw err; // You can handle the error further up in your code if needed
  }
};
// Function to generate a unique random order number and insert it into the database
exports.createOrder = async (req, res) => {
  const { order_number, created_by, customer_name } = req.body;
  try {
    const orderNumber = order_number
      ? order_number
      : await generateUniqueOrderNumber(order_number);

    // Check if the order number already exists
    const isOrderNumberExists = await checkOrderNumberExists(orderNumber);

    if (isOrderNumberExists) {
      res.status(400).json({ error: "Order number already exists" });
      return;
    }
    const status_id = await fetchStatus();

    // Insert the order into the database
    const insertedOrder = await Order.create({
      order_number: orderNumber,
      created_by,
      customer_name,
      order_status: status_id,
      payment_status: "not_paid",
    });
    res.status(201).json(insertedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Function to check if the order number already exists
async function checkOrderNumberExists(orderNumber) {
  try {
    const existingOrder = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
    });

    return !!existingOrder; // Return true if an order with the specified order_number exists, false otherwise
  } catch (err) {
    console.error("Error checking order number:", err);
    throw err; // You can handle the error further up in your code if needed
  }
}
// Function to fetch the status by name
async function fetchStatus() {
  try {
    const status = await OrderStatus.findOne({
      where: {
        name: "Draft", // Update with the desired status name
      },
    });

    return status ? status.id : null; // Return the status ID if found, or null if not found
  } catch (err) {
    console.error("Error fetching status:", err);
    throw err; // You can handle the error further up in your code if needed
  }
}
// Function to generate a unique order number
async function generateUniqueOrderNumber(order_number) {
  try {
    const orderNumber = order_number || generateRandomAlphaNumeric(6);

    // Check if the order number already exists in the database
    const existingOrder = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
    });

    if (!existingOrder) {
      // If the order number is unique, resolve with it
      return orderNumber;
    } else {
      // If the order number already exists, generate a new one recursively
      return generateUniqueOrderNumber();
    }
  } catch (err) {
    console.error("Error generating unique order number:", err);
    throw err; // You can handle the error further up in your code if needed
  }
}
// Function to generate a random alphanumeric string of a given length
function generateRandomAlphaNumeric(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status_id, order_number } = req.body;
    // Update the order status in the database
    const [, updatedRows] = await Order.update(
      { order_status: status_id },
      {
        where: {
          order_number: order_number,
        },
      }
    );

    if (updatedRows === 0) {
      // No rows were updated (order not found)
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order status update successfully" });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Error updating order status" });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { payment_status, order_number } = req.body;
    // Update the payment status in the database
    const [, updatedRows] = await Order.update(
      { payment_status: payment_status },
      {
        where: {
          order_number: order_number,
        },
      }
    );
    if (updatedRows === 0) {
      // No rows were updated (order not found)
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Payment status update successfully" });
  } catch (err) {
    console.error("Error updating payment status:", err);
    res.status(500).json({ error: "Error updating payment status" });
  }
};
exports.activeImage = async (req, res) => {
  try {
    const { image_path, order_number } = req.body;

    // Update the active image path in the database
    const [, updatedRows] = await Order.update(
      { active_image: image_path },
      {
        where: {
          order_number: order_number,
        },
      }
    );

    if (updatedRows === 0) {
      // No rows were updated (order not found)
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Image set as active successfully" });
  } catch (err) {
    console.error("Error setting active image:", err);
    res.status(500).json({ error: "Error setting active image" });
  }
};
