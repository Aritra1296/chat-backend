const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

//dummy

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
    name: req.body.name,
    received: req.body.received,
  })
  try {
    const savedMessage = await message.save()
    res.json(savedMessage)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
