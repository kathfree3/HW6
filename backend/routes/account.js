// routes to handle the log in system
const express = require('express')
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send({ success: false, msg: "This username doesn't exist" })
    } else {
      const { password: passDB } = user
      if (password === passDB) {
        req.session.username = username
        res.send({ success: true })
      } else {
        res.send({ success: false, msg: 'wrong password' })
      }
    }
  } catch (err) {
    next(new Error('user log in has problems'))
  }
})

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    req.session.username = username
    res.send({ success: true })
  } catch (err) {
    next(new Error('user creation has problems'))
  }
})

router.post('/logout', isAuthenticated, async (req, res, next) => {
  req.session.username = null
  req.session.password = null
  res.send({ success: true })
  next()
})

router.get('/isloggedin', (req, res) => {
  if (req.session.username !== null && req.session.username !== '') {
    res.send({ user: req.session.username })
  } else {
    res.send({ loggedin: false })
  }
})

module.exports = router
