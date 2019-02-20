const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('image', imageSchema);