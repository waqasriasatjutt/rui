const express = require("express");
const routes = express.Router();
const authController = require("../controllers/auth");

routes.route("/adduser").post(authController.createUser);
routes.route("/login").post(authController.login);

module.exports = routes;
