function verifyIsStudent(req, res, next) {
  if (req.userToken.body.userType !== "STUDENT") {
    return res.status('401').send({
      auth: false,
      message: "you must be a Student"
    })
  }
  next();
}

module.exports = verifyIsStudent;