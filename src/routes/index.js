const express = require('express');
const router = express.Router();
const authRouter = require("./auth.route");
const userRouter = require('./user.route');
const coursRouter = require('./cours.route');
const propositionRouter = require('./proposition.route');
const studentRouter = require('./student.route');

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/cours", coursRouter);
router.use("/proposition", propositionRouter);
router.use("/student", studentRouter);

module.exports = router;