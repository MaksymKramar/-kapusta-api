const { User } = require('../../models')

const getUserbyEmail = async (req, res) => {
  try {
    const { email } = req.user
    const currentUser = await User.findOne({ email })
    console.log(currentUser)

    if (currentUser) {
      res.status(200).json({
        name: currentUser.name,
        email: currentUser.email,
        balance: currentUser.balance,
        token: currentUser.token,
      })
      return
    }
  } catch (error) {
    res.json(error)
  }
}

module.exports = getUserbyEmail
