const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get("/:id", studentController.findFreelance);
router.post("/", studentController.findStudents);
router.post("/search", studentController.findSearchString);

module.exports = router;