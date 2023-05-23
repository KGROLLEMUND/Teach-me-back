const express = require('express');
const router = express.Router();
const coursController = require('../controllers/cours.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const verifyIsProf = require('../middlewares/verifyIsProf');
const verifyCoursBelongsToProf = require('../middlewares/verifyCoursBelongsToProf');
const verifyIsStudent = require('../middlewares/verifyIsStudent');

router.get("/all-cours", verifyToken, verifyIsStudent, coursController.getAllCours);
router.get("/my-cours", verifyToken, verifyIsProf, coursController.getMyCours);
router.get("/:id", verifyToken, verifyIsProf, verifyCoursBelongsToProf, coursController.getMyCour);
router.get("/admin/cours", verifyToken, verifyIsAdmin, coursController.getCours);
router.get("/admin/cours/:id", verifyToken, verifyIsAdmin, coursController.getCours);
router.post("/", verifyToken, verifyIsProf, coursController.createCours);
router.put('/:id', verifyToken, verifyIsProf, verifyCoursBelongsToProf, coursController.updateMyCours);
router.delete('/:id', verifyToken, verifyIsProf, verifyCoursBelongsToProf, coursController.deleteMyCours);

module.exports = router;