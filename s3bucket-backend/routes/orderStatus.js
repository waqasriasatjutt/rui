const express = require("express");
const routes = express.Router();
const ordersStatusController = require("../controllers/orderStatus");

routes.route("/order_status").post(ordersStatusController.addOrderStatus);
routes.route("/order_status").get(ordersStatusController.getOrderStatus);

module.exports = routes;