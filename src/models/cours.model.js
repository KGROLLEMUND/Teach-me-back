const mongoose = require("mongoose");

const coursSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 50,
      minLength: 2,
      required: true,
    },
    description: {
      type: String,
      maxLength: 500,
      minLength: 2,
      required: true,
    },
    prof: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prof",
    },
    propositions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposition",
      },
    ],
    matiere: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Matiere",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cours", coursSchema);

function arrayLimit(val) {
  return val.length <= 3;
}
