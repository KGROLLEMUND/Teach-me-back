function verifyIsProf(req, res, next) {
  if (req.userToken.body.userType !== "PROF") {
    return res.status('401').send({
      auth: false,
      message: "you must be a Prof"
    })
  }
  next();
}

module.exports = verifyIsProf;