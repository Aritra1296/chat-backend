const express = require('express')
const router = express.Router()
const User = require('../models/User')

//GET ALL THE CARTS
router.get('/allUsers', async (req, res) => {
  try {
    const user = await User.find()
    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A CART
router.post('/new',async (req, res) => {
  const user = new User({
    email: req.body.email,
    userName: req.body.userName,
    passwordHash: req.body.passwordHash,
  })
  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router