const isAuthenticated = (req, res, next) => {
  // get username from session
  const { username } = req.session || 0
  if (username && username !== '') { // allow request to continue
    next()
  } else { // throw error
    next(new Error('Not logged in!'))
  }
}

module.exports = isAuthenticated
