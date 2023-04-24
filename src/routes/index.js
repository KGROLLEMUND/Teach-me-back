const express = require('express');
const router = express.Router();
const authRouter = require("./auth.route");
const userRouter = require('./user.route');
const missionRouter = require('./mission.route');
const propositionRouter = require('./proposition.route');
const freelanceRouter = require('./student.route');

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/mission", missionRouter);
router.use("/proposition", propositionRouter);
router.use("/freelance", freelanceRouter);

module.exports = router;