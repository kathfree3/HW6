const express = require('express')
const session = require('cookie-session')
const mongoose = require('mongoose')

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

const app = express()

const my_url = 'mongodb+srv://dbuser:dbpassword@cluster0.pm7lg.mongodb.net/hw-db?retryWrites=true&w=majority'
const MONGO_URI = process.env.MONGODB_URI || my_url

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
}))

app.use('/account', accountRouter)
app.use('/api/questions', apiRouter)

app.listen(3000, () => {
  console.log('listening on 3000')
})
