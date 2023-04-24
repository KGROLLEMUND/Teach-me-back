const mongoose = require('mongoose');

const matiereSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    lowercase: true,
    required: true,
  },
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Matiere', matiereSchema);