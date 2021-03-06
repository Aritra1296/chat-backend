const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
   receiverId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Message', messageSchema)
