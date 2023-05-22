const Matiere = require("../models/matiere.model");

// get all Matieres
exports.getMatieres = async (req, res, next) => {
  try {
    //find Matieres and populate
    const matieres = await Matiere.find();
    //return matieres
    res.send({
      success: true, 
      objects: matieres
    })
  }
  catch (err) {
    next(err);
  }
}

// create one Matiere (for admin)
exports.createMatiere = async (req, res, next) => {

  const newMatiere = new Matiere({
    name: req.body.name,
    activity:req.body.activity
  })

  try {
    //save Matiere in DB
    const matiereToSave = await newMatiere.save();
    // return new matiere
    res.send({
      success: true,
      message: "matiere successfully create",
      matiere: matiereToSave
    })
  }
  catch(err) {
    next(err)
  }

}

//update one Matiere (for admin)
exports.updateMatiere = async (req, res, next) => {
  //
  try {
    // find and update in DB
    const matiereToUpdate = Matiere.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!matiereToUpdate) {
      const error = new Error("Matiere not found")
      error.status = 404
      throw error;
    }
    //return updated Matiere
    res.send({
      success: true,
      message: "matiere successfully updated",
      matiere: matiereToUpdate
    })
  }
  catch(err) {
    next(err)
  }
}

// remove one Matiere (admin)
exports.removeMatiere = async (req, res, next) => {
  try {
    //find and remove in DB
    const matiereToDelete = await Matiere.findByIdAndRemove(req.params.id);
    if (!matiereToDelete) {
      const error = new Error("Matiere not found")
      error.status = 404
      throw error;
    }
    // return deleted Matiere
    res.send({
      success: true,
      message: "matiere successfully delete",
      matiere: matiereToDelete
    })
  }
  catch(err) {
    next(err)
  }
}