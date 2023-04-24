const mongoose = require("mongoose");

const profSchema = mongoose.Schema(
  {
    niveauEnseignement: {
      type: String,
      required: true,
    },
    matiere: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Matiere",
        required: true,
      },
    ],
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

module.exports = mongoose.model("Prof", profSchema);
4;
