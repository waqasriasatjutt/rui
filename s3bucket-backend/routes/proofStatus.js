const express = require("express");
const routes = express.Router();
const proofStatusController = require("../controllers/proofStatus");

routes.route("/proof_status").post(proofStatusController.addProofStatus);
routes.route("/proof_status").get(proofStatusController.getProofStatus);

module.exports = routes;