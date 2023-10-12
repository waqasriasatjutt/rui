const express = require("express");
const routes = express.Router();
const ordersController = require("../controllers/orders");

routes.route("/orders").post(ordersController.createOrder);
routes.route("/orders").get(ordersController.getOrders);
routes.route("/orders/:order_number").get(ordersController.getOrdersById);
routes.route("/update_status").post(ordersController.updateOrderStatus);
routes.route("/update_payment_status").post(ordersController.updatePaymentStatus);
routes.route("/active_image").post(ordersController.activeImage);
module.exports = routes;