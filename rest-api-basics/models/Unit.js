const mongoose = require('mongoose');

const UnitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  race: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: false,
    default: "Novice"
  },
  level: {
    type: Number,
    required: true
  },
  equipment: {
    type: [String],
    required: true
  }
})

module.exports = mongoose.model('Units', UnitSchema);
