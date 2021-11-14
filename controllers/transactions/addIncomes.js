const { Transaction, User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const addIncomes = async (req, res) => {
  const { _id } = req.user
  const newTransaction = { ...req.body, owner: _id }
  const user = await User.findById(_id)
  // console.log(user.balance)
  const newBalance = user.balance + req.body.sum
  // console.log(newBalance)

  try {
    await User.findByIdAndUpdate(
      _id,
      { balance: newBalance },
      {
        new: true,
      },
    )
    const result = await Transaction.create(newTransaction)
    sendSuccessRes(res, { result }, 201)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = addIncomes
