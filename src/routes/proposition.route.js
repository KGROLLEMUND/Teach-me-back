const express = require('express');
const router = express.Router();
const propositionController = require('../controllers/proposition.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsStudent = require('../middlewares/verifyIsStudent');
const verifyIsProf = require('../middlewares/verifyIsProf');
const verifyMissionBelongsToProf = require('../middlewares/verifyMissionBelongsToProf');
const verifyNbOfPropositions = require('../middlewares/verifyNbOfPropositions');

router.get("/my-propositions/", verifyToken, verifyIsStudent, propositionController.getMyPropositions )
router.post("/create/:id", verifyToken, verifyIsProf, verifyMissionBelongsToProf, verifyNbOfPropositions, propositionController.createProposition);
router.post("/update-student/:id", verifyToken, verifyIsStudent, propositionController.updatePropositionFromStudent)
module.exports = router;