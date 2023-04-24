const mongoose = require('mongoose');

const propositionSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ['PENDING', 'REFUSED', 'ACCEPTED'],
    required: true
  },
  cours: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Cours',
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Proposition', propositionSchema);