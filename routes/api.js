// routes that handle question updates
// routes to handle the log in system
const express = require('express')
const Question = require('../models/question')

const router = express.Router()

router.get('/', async (req, res) => {
  const questions = await Question.find()
  console.log(questions)
  res.send('getting all the questions')
})

router.post('/add', async (req, res) => {
  const author = req.session.username
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

router.post('/answer', async (req, res) => {
  const author = req.session.username
  res.send(`${author} trying to answer a post`)
})

module.exports = router
