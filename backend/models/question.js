// package imports
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  author: { type: String, required: true },
})

module.exports = model('Question', questionSchema)
