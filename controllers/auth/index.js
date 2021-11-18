const signup = require('./singup')
const login = require('./login')
const logout = require('./logout')
const updateBalance = require('./updateBalance')
const current = require('./current')
const getUserbyEmail = require('./getUserbyEmail')
const { googleAuth, googleRedirect } = require('./googleAuth')

module.exports = {
  signup,
  login,
  logout,
  updateBalance,
  current,
  getUserbyEmail,
  googleAuth,
  googleRedirect,
}
