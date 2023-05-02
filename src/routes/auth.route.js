const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { checkEmail, checkIdentity, checkPassword, validation } = require('../middlewares/validators');
const verifyIsProf = require('../middlewares/verifyIsProf');
const verifyIsStudent = require('../middlewares/verifyIsStudent');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', checkEmail, checkPassword, checkIdentity, validation, authController.register);
router.post('/login', checkEmail, validation, authController.login);
router.post('/prof', verifyToken, verifyIsProf, authController.registerProf);
router.post('/student', verifyToken, verifyIsStudent, authController.registerStudent);

module.exports = router;