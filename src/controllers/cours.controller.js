const Cours = require("../models/cours.model");
const User = require("../models/user.model");
const Prof = require("../models/prof.model");

//create Cours from User Prof
exports.createCours = async (req, res, next) => {
  try {
    //find user
    const me = await User.findById(req.userToken.body.id);
    //find Prof
    const myProf = await Prof.findById(me.prof);
    //new Cours
    const newCours = new Cours({
      title: req.body.title,
      description: req.body.description,
      matiere: req.body.matiere,
      status: "DISPONIBLE",
      prof: myProf._id,
    });
    // save Cours in DB
    const coursToCreate = await newCours.save();
    
    if (coursToCreate) {
      // add ref Cours to model Prof
      myProf.cours.push(coursToCreate._id);
      //save to DB
      await myProf.save();
      //return Cours
      return res.send({
        success: true,
        message: "cours successfully created",
        cours: coursToCreate
      })
    }
  }
  catch (err) {
    next(err);
  }

}

//get cours from User Prof
exports.getMyCours = async (req, res, next) => {
  try {
    //find user
    const me = await User.findById(req.userToken.body.id).populate('prof');
    //find user Prof and populate cours
    const myProf = await Prof.findById(me.prof).populate({
      path: "cours",
      model: "Cours",
      populate: {
        path: "propositions",
        model:"Proposition"
      }
    });
    console.log(myProf);
    //return courss
    res.send({
      success: true,
      cours: myProf.cours
    })
  }
  catch(err) {
    next(err);
  }
}

//get cour from User Prof
exports.getMyCours = async (req, res, next) => {
  try {
    //find cours
    const myCours = await Cours.findById(req.params.id);
    // return cour
    res.send({
      success: true,
      cours: myCours
    })
  }
  catch(err) {
    next(err);
  }
}

// update cour from User Prof
exports.updateMyCours = async (req, res, next) => {
  try {
    //update cour
    const coursToUpdate = await Cours.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //return cour updated
    res.send ({
      success: true,
      message:"Cours successfully updated",
      cours: coursToUpdate
    });
  }
  catch (err) {
    next(err);
  }

}

//delete Cours from User Prof
exports.deleteMyCours = async (req, res, next) => {
  try {
    //find and delete Cours
    const coursToRemove = await Cours.findByIdAndRemove(req.params.id, req.body);
    // return Cours removed
    res.send ({
      success: true,
      message: "Cours successfully removed",
      cour: courToRemove
    });
  }
  catch (err) {
    next(err);
  }
}

//get Courss (admin)
exports.getCours = async (req, res, next) => {
  try {
    //find all Cours and populate propositions
    const cours = Cours.find().populate('propositions');
    // return Courss
    res.send({
      cours: cours,
      success:true
    })
  }
  catch(err) {
    next(err);
  }
}

//get Cours (admin)
exports.getCours = async (req, res, next) => {
   //find one Cours and populate propositions
  try {
    const cours = Cours.findbyId(req.params.id).populate('propositions');
    //return Cours
    res.send({
      cours: cours,
      success:true
    })
  }
  catch(err) {
    next(err);
  }
}