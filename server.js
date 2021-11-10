// package imports
const express = require('express')
const session = require('cookie-session')
const mongoose = require('mongoose')

// local imports
const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

// define app
const app = express()

// connect to mongo db
const my_url = 'mongodb+srv://dbuser:dbpassword@cluster0.pm7lg.mongodb.net/hw-db?retryWrites=true&w=majority'
const MONGO_URI = process.env.MONGODB_URI || my_url

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// use json parser
app.use(express.json())

// set up cookie session
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
}))

// give app the routers
app.use('/account', accountRouter)
app.use('/api/questions', apiRouter)

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
