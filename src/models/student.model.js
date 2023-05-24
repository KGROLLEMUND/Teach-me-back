const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    niveauEtude: {
      type: Number,
      required: true,
      min: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propositions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposition",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
