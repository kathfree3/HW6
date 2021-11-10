// package imports
const express = require('express')
const { ObjectId } = require('mongoose').Types

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
  const { questionText } = req.body
  try {
    await Question.create({ questionText, author })
    res.send('question created')
  } catch (err) {
    res.send('post creation has problems')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body
  if (!ObjectId.isValid(_id)) {
    res.send('Illegal question id')
  } else {
    const question = await Question.findById({ _id })
    if (!question) {
      res.send("Trying to answer a question that doesn't exist")
    } else {
      question.answer = answer
      question.save(err => {
        const msg = err ? 'Issue with answering question' : 'answered successfully'
        res.send(msg)
      })
    }
  }
})

module.exports = router
