const express = require("express");
const routes = express.Router();

const lineItemsController = require("../controllers/lineItems");
routes.route("/add_items/:order_number").get(lineItemsController.getLineItems);
// routes.route("/add_items").post(lineItemsController.addLineItem);

module.exports = routes;