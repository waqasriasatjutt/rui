const express = require("express");
const routes = express.Router();
const commentController = require("../controllers/comments");

routes.route("/comments").post(commentController.addComment);
routes.route("/comments/:order_number").get(commentController.getComments);

module.exports = routes;