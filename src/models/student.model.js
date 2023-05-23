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
    cours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cours",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
