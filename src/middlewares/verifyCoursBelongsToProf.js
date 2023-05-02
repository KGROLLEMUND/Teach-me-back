const User = require("../models/user.model");
const Prof = require("../models/prof.model");

async function verifyMissionBelongsToProf(req, res, next) {
  try {
    const me = await User.findById(req.userToken.body.id);
      const myProf = await Prof.findById(me.prof).populate('cours');
      if (!myProf.cours.some((el) =>el._id.equals(req.params.id))) {
        return res.status(404).send({
          success:false,
          message: "ce profil ne correspond pas a ce prof"
        })
      }
      next();
  }
  catch (err) {
    const error = new Error(err)
    error.status = 400
    throw error;
  }
}

module.exports = verifyMissionBelongsToProf;