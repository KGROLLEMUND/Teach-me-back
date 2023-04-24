const User = require("../models/user.model");
const Prof = require("../models/prof.model");
const Student = require("../models/student.model");
const bcrypt = require("bcrypt");
const sendMail = require('../utils/sendMail');
const signJwt = require('../utils/signJwt');

//register a user
exports.register = async (req, res, next) => {

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    userType: req.body.userType,
    address: {
      city: req.body.address.city,
      zipCode: req.body.address.zipCode,
      street: req.body.address.street
    }
  });

  try {
    // save email in DB
    const newUserToSave = await newUser.save();
    //create new Token
    let userToken = signJwt({
      id: newUserToSave._id,
      isAdmin: newUserToSave.isAdmin,
      userType: newUserToSave.userType,
    })
    if (userToken) {
      //send email to new user
      await sendMail(
        newUser.email,
        "Confirmation d'inscription",
        `Hello ${newUser.firstName}`,
        "Votre inscription est confirmée."
      );
      //send email to Admin 
      await sendMail(
        process.env.ADMIN_EMAIL,
        "[Admin] - Confirmation d'inscription",
        `Hello Admin`,
        `Nouvelle inscription : ${newUser.email}`
      );
      //return User
      return res.send({
        success: true,
        message: "User logged",
        auth: true,
        token: userToken
      })
    }
  }
  catch (err) {
    next(err);
  }

}

//login user
exports.login = async (req, res, next) => {
  try {
    //find a user
    const userLogged = await User.findOne({ email: req.body.email });
    //throw error if no user
    if (!userLogged) {
      const error = new Error("user not found")
      error.status = 404
      throw error;
    }
    //compare password
    let passwordValid = bcrypt.compareSync(req.body.password, userLogged.password);
    //if no password throw error
    if (!passwordValid) {
      const error = new Error("password not valid")
      error.status = 401
      throw error;
    }
    //sign jwt
    let userToken = signJwt({
      id: userLogged._id,
      isAdmin: userLogged.isAdmin,
      userType: userLogged.userType,
    })
    // return token
    return res.send({
      success: true,
      message: "User logged",
      auth: true,
      token: userToken
    })
  }
  catch (err) {
    next(err);
  }
}

//register a user with user type Student
exports.registerStudent = async (req, res, next) => {
  try {
    //get the user who want to register as a Student
    const me = await User.findById(req.userToken.body.id);
    // create a new Student instance
    const newStudent = new Student({
      rate: req.body.rate,
      yearOfExperience: req.body.yearOfExperience,
      user: req.userToken.body.id
    });
    //if user already have a Student acccount
    if (me.student) {
      const error = new Error("User already have a student account")
      error.status = 400
      throw error;
    }
    // save the Student in db
    const newStudentToSave = await newStudent.save();
    //Add Student ref to User model and save to DB
    me.student = newStudentToSave._id;
    await me.save();
    //return new Student
    res.send({
      success: true,
      message: "Student successfully create",
      student: newStudentToSave
    })
  }
  catch (err) {
    next(err);
  }
}

//register a Prof with user type Prof
exports.registerProf = async (req, res, next) => {

  //get the user who want to register Prof
  const me = await User.findById(req.userToken.body.id);
  
  // create a new Prof instance
  const newProf = new Prof({
    name: req.body.name,
    status: req.body.status,
    siret: req.body.siret,
    address: {
      city: req.body.address.city,
      zipCode: req.body.address.zipCode,
      street: req.body.address.street
    },
    user: me._id
  })

  try {
    //if user already have a Prof account
    if (me.prof) {
      const error = new Error("User already have a prof account")
      error.status = 400
      throw error;
    }
    // save prof in DB
    const newProfToSave = await newProf.save();
    //Add Student ref to User and save to DB
    me.prof = newProfToSave._id;
    await me.save();
    // return Prof
    res.send({
      success: true,
      message: "prof successfully create",
      prof: newProfToSave
    })
  }
  catch (err) {
    next(err);
  }
}