// package imports
const express = require('express')

// local imports
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

// define router
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.send(questions)
  } catch (err) {
    next(new Error('issue getting questions from db'))
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { username: author } = req.session
  const { questionText } = req.body
  const answer = ' '
  try {
    await Question.create({ questionText, answer, author })
    res.send('question created')
  } catch (err) {
    next(new Error('post creation has problems'))
  }
})

router.post('/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    const question = await Question.findById({ _id })
    if (!question) {
      res.send("Trying to answer a question that doesn't exist")
    } else {
      question.answer = answer
      question.save(err => {
        if (err) {
          res.send({ errmsg: 'Issue with answering question' })
        } else {
          res.send({ msg: 'answered successfully' })
        }
      })
    }
  } catch (err) {
    next(new Error('Answering question issues'))
  }
})

module.exports = router
