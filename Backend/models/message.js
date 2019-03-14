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
    required: true
  }
})

module.exports = mongoose.model('Message', messageSchema);