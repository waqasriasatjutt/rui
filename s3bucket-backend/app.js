require("dotenv").config();
require("./config/database");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Logic goes here

module.exports = app;
