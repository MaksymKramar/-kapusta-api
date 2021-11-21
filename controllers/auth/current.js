const { User } = require('../../models')

const current = async (req, res) => {
  try {
    const { _id } = req.user
    const currentUser = await User.findById(_id)

    if (currentUser) {
      res.status(200).json({
        name: currentUser.name,
        email: currentUser.email,
        balance: currentUser.balance,
      })
      return
    }
  } catch (error) {
    res.json(error)
  }
}

module.exports = current
