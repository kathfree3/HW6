// routes to handle the log in system
const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => {
  console.log('hi')
  res.send('idk')
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    console.log(user)
    if (!user) {
      res.send('user doses not exist')
    } else {
      const { password: passDB } = user
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    console.log(err)
    res.send('user creation has problems')
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

router.post('/logout', async (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

module.exports = router
