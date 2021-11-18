const { User } = require('../../models')

const updateBalance = async (req, res) => {
  try {
    const { _id } = req.user
    const { balance } = req.body
    // console.log(balance)
    if (balance > 0) {
      const user = await User.findByIdAndUpdate(
        _id,
        { balance },
        {
          new: true,
        },
      )
      if (user) {
        res.status(200).json({ email: user.email, balance: user.balance })
        return
      }
    }
    res.status(404).json({
      message: 'New balance should be a Number and should be bigger then "0"',
    })
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports = updateBalance
