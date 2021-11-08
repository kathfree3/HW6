const mongoose = require('mongoose')
const express = require('express')

const app = express()

const my_url = 'mongodb+srv://dbuser:dbpassword@cluster0.pm7lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const MONGO_URI = process.env.MONGODB_URI || my_url

const accountRouter = require('./routes/account')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(express.json())

app.use('/account', accountRouter)

app.listen(3000, () => {
  console.log('listening on 3000')
})
