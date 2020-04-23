const mongoose = require('mongoose');

const RaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  stats: {
    required: true,
    type: {
      attack: Number,
      magic: Number,
      defence: Number,
      resistance: Number,
      speed: Number
    }
  },
  allowedJobs: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Races', RaceSchema);
