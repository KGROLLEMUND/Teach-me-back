const Proposition = require("../models/proposition.model");
const Student = require("../models/student.model");
const Cours = require("../models/cours.model");
const User = require("../models/user.model");

//propose a Cours to a Student
exports.createProposition = async (req, res, next) => {
  //new proposition
  const newProposition = new Proposition({
    status: "PENDING",
    student: req.userToken.body.id,
    cours: req.params.id,
    datetime: req.body.datetime,
  });

  try {
    //save proposition in DB
    const newPropositionToSave = await newProposition.save();

    //attached id of propositon to cours
    const coursToSave = await Cours.findById(req.params.id);
    coursToSave.propositions.push(newPropositionToSave._id);
    await coursToSave.save();
    //attached a proposition to a student

    //find user student email and send email to student
    const selectUser = await User.findById(req.userToken.body.id);
    const selectedStudent = await Student.findById(selectUser.student);
    selectedStudent.propositions.push(newPropositionToSave._id);
    
    //save it
    await selectedStudent.save();
    //return new proposition
    res.send({
      success: true,
      proposition: newPropositionToSave,
    });
  } catch (err) {
    next(err);
  }
};

//get all propositions from a Student
exports.getMyPropositions = async (req, res, next) => {
  try {
    //find logged user and populate deeply inside Student and proposition
    const me = await User.findById(req.userToken.body.id).populate({
      path: "student",
      model: "Student",
      populate: {
        path: "propositions",
        model: "Proposition",
        populate: {
          path: "cours",
          model: "Cours",
        },
      },
    });
    // return Student's propositions
    res.send({
      success: true,
      propositions: me.student.propositions,
    });
  } catch (err) {
    next(err);
  }
};

//Accept or decline proposition
exports.updatePropositionFromStudent = async (req, res, next) => {
  try {
    //find the status in req.body
    const status = req.body.status;
    //Accet or decline process
    switch (status) {
      //Student refused the proposition
      case "REFUSED":
        // update  proposition status
        await Proposition.findByIdAndUpdate(
          req.params.id,
          { status: "REFUSED" },
          { new: true }
        );
        // return success message
        return res.send({
          success: true,
          message: "proposition successfully refused",
        });
      //student accept the proposition
      case "ACCEPTED":
        //update proposition status
        await Proposition.findByIdAndUpdate(
          req.params.id,
          { status: "ACCEPTED" },
          { new: true }
        );
        //return success message
        return res.send({
          success: true,
          message: "proposition successfully validated",
        });
      // if req.body.status is not  ACCEPTED OR REFUSED
      default:
        const error = new Error("Status not allowed");
        error.status = 401;
        throw error;
    }
  } catch (err) {
    next(err);
  }
};
