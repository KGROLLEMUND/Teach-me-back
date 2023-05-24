const mongoose = require("mongoose");

const propositionSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["PENDING", "REFUSED", "ACCEPTED"],
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    cours: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cours",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Proposition", propositionSchema);
