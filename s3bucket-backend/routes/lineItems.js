const express = require("express");
const routes = express.Router();

const lineItemsController = require("../controllers/lineItems");
routes.route("/line_items/:order_number").get(lineItemsController.getLineItems);
// routes.route("/add_items").post(lineItemsController.addLineItem);
routes.route("/line_items/line_item_detail/:line_item_id").get(lineItemsController.getLineItemDetail);

module.exports = routes;