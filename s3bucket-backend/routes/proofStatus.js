const express = require("express");
const routes = express.Router();
const proofStatusController = require("../controllers/proofStatus");

routes.route("/proof_status").post(proofStatusController.addProofStatus);
routes.route("/proof_status").get(proofStatusController.getProofStatus);
routes.route("/update_proof_status").post(proofStatusController.updateProofStatus);

module.exports = routes;