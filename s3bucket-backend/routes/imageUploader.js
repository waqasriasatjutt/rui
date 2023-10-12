const express = require("express");
const routes = express.Router();
const imageController = require("../controllers/imageUpload");

routes.route("/upload").post(imageController.uploadImage);

module.exports = routes;
