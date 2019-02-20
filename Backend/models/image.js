const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  type: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('image', imageSchema);