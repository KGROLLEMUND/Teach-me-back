const Prof = require("../models/prof.model");

//find one prof based in ID
exports.findProf = async (req, res, next) => {
  try {
    const prof = await Prof.findById(req.params.id);
    if (!prof) {
      const error = new Error("prof not found")
      error.status = 404
      throw error;
    }
    res.send({
      success: true,
      prof: prof
    })
  }
  catch (err) {
    next(err);
  }
}

//find profs based one multiple filters
exports.findProfs = async (req, res, next) => {
  try {
    //find profs on DB
    const profs = await Prof.find().populate('skills');
    //if filters inside body of request
    if (req.body.filters) {
      //apply filters
      const filteredProf = profs.filter((prof) => {
        return req.body.filters.rate
          ? prof.rate >= req.body.filters.rate.range[0]
          && prof.rate <= req.body.filters.rate.range[1] : false
          || req.body.filters.exp
          ? prof.yearOfExperience >= req.body.filters.exp.range[0]
          && prof.yearOfExperience <= req.body.filters.exp.range[1] : false
          || req.body.filters.skills
          ? prof.skills.some((el) => req.body.filters.skills.includes(String(el))) : false
      });
      //return filtered profs
      return res.send({
        success: true,
        profs: filteredProf
      })
    }
    //return non filtered profs
    return res.send({
      success: true,
      profs: profs
    })
  }
  catch (err) {
    next(err);
  }

}


//find profs based one search string
exports.findSearchString = async (req, res, next) => {
  try {
    //find profs
    const profs = await Prof.find().populate([
      {
        path: "user",
        model: "User"
      },
    ]);
    //if search string inside req.body
    if (req.body.searchString) {
      //transform string in array bases on spaced 
      const termsArray = req.body.searchString.toLowerCase().split(' ');
      //apply filter
      const filteredProf = profs.filter((prof) => {
        return termsArray.some(
          el => {
            return prof.user.firstName.includes(el) ||
              prof.user.lastName.includes(el)
          }
        )
      })
      // return filtered prof
      return res.send({
        success: true,
        profs: filteredProf
      })
    }
    //return non filtered prof
    return res.send({
      success: true,
      profs: profs
    })
  }
  catch (err) {
    next(err);
  }
}