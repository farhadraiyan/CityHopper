const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  message: {
    type: String,
    required: true,
  },
  time_created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Message', messageSchema);