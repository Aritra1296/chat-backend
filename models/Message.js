const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  received: {
    type: Boolean,
    required: true,
  },
})

module.exports = mongoose.model('Message', messageSchema)
