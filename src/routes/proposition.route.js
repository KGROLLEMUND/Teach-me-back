const express = require("express");
const router = express.Router();
const propositionController = require("../controllers/proposition.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyIsStudent = require("../middlewares/verifyIsStudent");
const verifyIsProf = require("../middlewares/verifyIsProf");

router.get(
  "/my-propositions/",
  verifyToken,
  verifyIsStudent,
  propositionController.getMyPropositions
);
router.post(
  "/create/:id",
  verifyToken,
  verifyIsStudent,
  propositionController.createProposition
);
router.put(
  "/update/:id",
  verifyToken,
  verifyIsProf,
  propositionController.updatePropositionFromStudent
);
module.exports = router;
