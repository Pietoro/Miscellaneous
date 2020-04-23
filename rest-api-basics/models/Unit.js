const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UnitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  race: {
    type: ObjectId,
    ref: 'Races',
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
