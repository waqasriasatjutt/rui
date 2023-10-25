const express = require("express");
const routes = express.Router();
const ordersController = require("../controllers/orders");
routes.route("/orders").get(ordersController.getOrders);
module.exports = routes;