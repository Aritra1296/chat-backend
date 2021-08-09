const express = require('express')
const router = express.Router()
const Message = require('../models/Message')


//GET ALL THE MESSAGES
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId })
    res.json(cart)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A MESSAGE
router.post('/new', async (req, res) => {
  console.log(req.body);
  const message = new Message({
    message: req.body.message,
    name: req.body.name,
    timestamp: req.body.timestamp,
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
