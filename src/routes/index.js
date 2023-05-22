const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const coursRouter = require("./cours.route");
const propositionRouter = require("./proposition.route");
const studentRouter = require("./prof.route");
const matiereRouter = require("./matiere.route");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/cours", coursRouter);
router.use("/proposition", propositionRouter);
router.use("/student", studentRouter);
router.use("/matiere", matiereRouter);

module.exports = router;
