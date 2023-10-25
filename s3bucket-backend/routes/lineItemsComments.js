const express = require("express");
const routes = express.Router();
const commentController = require("../controllers/lineItemsComments");

routes.route("/line_item_comments").post(commentController.addLineItemComment);

module.exports = routes;