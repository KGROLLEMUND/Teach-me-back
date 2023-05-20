const Proposition = require("../models/proposition.model");
const Student = require("../models/student.model");
const Cours = require("../models/cours.model");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendMail");

//propose a Cours to a Student
exports.createProposition = async (req, res, next) => {

  //new proposition
  const newProposition = new Proposition({
    status: "PENDING",
    student: req.body.studentId,
    cours: req.params.id
  });

  try {
    //save proposition in DB
    const newPropositionToSave = await newProposition.save();
    //find user student email and send email to student
    const selectedStudent = await Student.findById(req.body.student).populate('user');
    //attached id of propositon to cours
    const coursToSave = await Cours.findById(req.params.id);
    coursToSave.propositions.push(newPropositionToSave._id);
    await coursToSave.save();
    //attached a proposition to a student
    selectedStudent.propositions.push(newPropositionToSave.id);
    //save it
    await selectedStudent.save();
    //send email to Student
    sendEmail(selectedStudent.user.email, 'Proposition de cours', "Un(e) entreprise vous demande un cours", "Vous pouvez accepter ou refuser le cours en cliquant sur ce lien")
    //return new proposition
    res.send({
      success: true,
      proposition: newPropositionToSave
    })
  }
  catch (err) {
    next(err)
  }

}

//get all propositions from a Student 
exports.getMyPropositions = async (req, res, next) => {
  try {
    //find logged user and populate deeply inside Student and proposition
    const me = await User.findById(req.userToken.body.id).populate(
      {
        path: "student",
        model: "Student",
        populate: {
          path: "propositions",
          model: "Proposition"
        }
      }
    );
    // return Student's propositions
    res.send({
      success: true,
      propositions: me.student.propositions
    })
  }
  catch (err) {
    next(err)
  }
}

//Accept or decline proposition
exports.updatePropositionFromStudent = async (req, res, next) => {

  try {
    //find the status in req.body
    const status = req.body.status;
    // find connected user
    const me = await User.findById(req.userToken.body.id);
    //Accet or decline process 
    switch (status) {
      //Student refused the proposition
      case "REFUSED":
        // update  proposition status
        await Proposition.findByIdAndUpdate(req.params.id, { status: 'REFUSED' }, { new: true });
        //send email to admin
        sendEmail(me.email, "Refus de la demande de cours", "Le prof a refusé le cours", `le prof ${me.id} a refusé le cours`);
        // return success message
        return res.send({
          success: true,
          message: "proposition successfully refused"
        })
      //student accept the proposition
      case "ACCEPTED":
        //update proposition status
        await Proposition.findByIdAndUpdate(req.params.id, { status: 'ACCEPTED' }, { new: true });
        //send email to admin
        sendEmail(me.email, "Validation de cours", "Le prof a validé la cours", `le prof ${me.id} a validé la cours`);
        //return success message
        return res.send({
          success: true,
          message: "proposition successfully validated"
        })
      // if req.body.status is not  ACCEPTED OR REFUSED
      default:
        const error = new Error("Status not allowed")
        error.status = 401
        throw error;

    }
  }
  catch (err) {
    next(err);
  }
}