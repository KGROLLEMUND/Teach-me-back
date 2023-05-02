const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const verifyIsStudent = require('../middlewares/verifyIsStudent');
const verifyIsProf = require('../middlewares/verifyIsProf');

router.get("/", verifyToken, userController.getMe);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", verifyToken, userController.resetPassword);
router.get("/admin/user/:id", verifyToken, verifyIsAdmin, userController.getUser);
router.get('/admin/users', verifyToken, verifyIsAdmin, userController.getUsers)
router.put("/", verifyToken, userController.updateMe);
router.put("/prof", verifyToken, verifyIsProf, userController.updateMyProf);
router.put("/student", verifyToken, verifyIsStudent,userController.updateMyStudent);
router.put("/admin/user/:id", verifyToken, verifyIsAdmin, userController.updateUser);
router.delete("/admin/user/:id", verifyToken, verifyIsAdmin, userController.deleteUser);

module.exports = router;