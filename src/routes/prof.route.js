const express = require('express');
const router = express.Router();
const profController = require('../controllers/prof.controller');

router.get("/:id", profController.findProf);
router.post("/", profController.findProfs);
router.post("/search", profController.findSearchString);

module.exports = router;