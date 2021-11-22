const { User } = require('../../models')

const getBalance = async (req, res) => {
  try {
    const { _id } = req.user
    const currentUser = await User.findById(_id)

    if (currentUser) {
      res.status(200).json({
        balance: currentUser.balance,
      })
      return
    }
  } catch (error) {
    res.json(error)
  }
}

module.exports = getBalance
