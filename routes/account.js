// routes to handle the log in system

// '/signup' POST

// '/login' POST

// '/logout' POST

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('all the projects in your repo')
})

module.exports = router
