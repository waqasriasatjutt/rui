const express = require("express");
const routes = express.Router();
const uploadTypesController = require("../controllers/uploadTypes");

routes.route("/upload_type").post(uploadTypesController.addUploadTypes);
routes.route("/upload_type").get(uploadTypesController.getUploadTypes);

module.exports = routes;