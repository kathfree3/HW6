// routes to handle the log in system
const express = require('express')
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('user doses not exist')
    } else {
      const { password: passDB } = user
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send(`${username} logged in successfully`)
      } else {
        res.send(`${username} credentials are wrong`)
      }
    }
  } catch (err) {
    console.log(err)
    res.send('user log in has problems')
  }
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    res.send('user created')
  } catch (err) {
    console.log(err)
    res.send('user creation has problems')
  }
})

router.post('/logout', isAuthenticated, async (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

module.exports = router
