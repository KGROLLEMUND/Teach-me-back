const express = require('express');
const router = express.Router();
const coursController = require('../controllers/cours.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const verifyIsProf = require('../middlewares/verifyIsProf');
const verifyCoursBelongsToProf = require('../middlewares/verifyCoursBelongsToProf');

router.get("/cours", verifyToken, verifyIsProf, coursController.getMyCours);
router.get("/:id", verifyToken, verifyIsProf, verifyCoursBelongsToProf, coursController.getMyCours);
router.get("/admin/cours", verifyToken, verifyIsAdmin, coursController.getCours);
router.get("/admin/cours/:id", verifyToken, verifyIsAdmin, coursController.getCours);
router.post("/", verifyToken, verifyIsProf, coursController.createCours);
router.put('/:id', verifyToken, verifyIsProf, verifyCoursBelongsToProf, coursController.updateMyCours);
router.delete('/:id', verifyToken, verifyIsProf, verifyCoursBelongsToProf, coursController.deleteMyCours);

module.exports = router;