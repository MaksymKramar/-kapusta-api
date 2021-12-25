const { Transaction, User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const addTransaction = async (req, res) => {
  const { _id } = req.user
  const { type, sum, date } = req.body
  console.log(req.user)

  const [day, month, year] = date.split('.')
  const newTransaction = {
    ...req.body,
    owner: _id,
    day,
    month,
    year,
  }
  const user = await User.findById(_id)

  try {
    if (!type) {
      const newBalance = user.balance - sum

      await User.findByIdAndUpdate(
        _id,
        { balance: newBalance },
        {
          new: true,
        },
      )
      const result = await Transaction.create(newTransaction)
      sendSuccessRes(res, { result }, 201)
    } else {
      const newBalance = user.balance + sum

      await User.findByIdAndUpdate(
        _id,
        { balance: newBalance },
        {
          new: true,
        },
      )
      const result = await Transaction.create(newTransaction)
      sendSuccessRes(res, { result }, 201)
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = addTransaction
