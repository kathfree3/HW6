// package imports
const express = require('express')
const path = require('path')
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

app.use(express.static('dist'))

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

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on 3000')
})
