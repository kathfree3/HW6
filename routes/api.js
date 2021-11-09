// package imports
const express = require('express')

// local imports
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

// define router
const router = express.Router()

router.get('/', async (req, res) => {
  const questions = await Question.find()
  res.send(questions)
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { username: author } = req.session
  const answer = ''
  const { questionText } = req.body
  try {
    await Question.create({ questionText, answer, author })
    res.send('question created')
  } catch (err) {
    console.log(err)
    res.send('post creation has problems')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const author = req.session.username
  res.send(`${author} trying to answer a post`)
})

module.exports = router
