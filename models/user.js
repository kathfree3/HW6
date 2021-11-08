/*
username which is of type String (username is the unique identifier)
password which is of type String
*/

const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = model('User', userSchema)
