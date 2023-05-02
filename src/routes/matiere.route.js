const express = require('express');
const router = express.Router();
const matiereController = require('../controllers/matiere.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.get("/", matiereController.getMatieres);
router.post("/", verifyToken, verifyIsAdmin, matiereController.createMatiere);
router.put("/", verifyToken, verifyIsAdmin, matiereController.updateMatiere);
router.delete("/", verifyToken, verifyIsAdmin, matiereController.removeMatiere);

module.exports = router;