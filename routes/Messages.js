const express = require('express')
const router = express.Router()
const Message = require('../models/Message')


//GET ALL THE MESSAGES
router.get('/all', async (req, res) => {
  try {
    const message = await Message.find()
    res.json(message)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A MESSAGE
router.post('/new', async (req, res) => {
  const message = new Message({
    message: req.body.message,
    receiverId: req.body.receiverId,
    senderId: req.body.senderId,
  })
  try {
    const savedMessage = await message.save()
    res.json(savedMessage)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
