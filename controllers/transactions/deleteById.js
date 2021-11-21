const { Transaction, User } = require('../../models')
const { sendSuccessRes } = require('../../utils')
const { NotFound } = require('http-errors')

// eslint-disable-next-line no-unused-vars
const deleteById = async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id)
  const { transactionId } = req.params
  try {
    const transaction = await Transaction.findById(transactionId)
    const { type } = transaction
    const { sum } = transaction

    if (!type) {
      const newBalance = user.balance + sum

      await User.findByIdAndUpdate(
        _id,
        { balance: newBalance },
        {
          new: true,
        },
      )
      const result = await Transaction.findByIdAndDelete(transactionId)
      if (!result) {
        throw new NotFound(`Not found`)
      }
      sendSuccessRes(res, { message: 'transaction deleted' })
    } else {
      const newBalance = user.balance - sum

      await User.findByIdAndUpdate(
        _id,
        { balance: newBalance },
        {
          new: true,
        },
      )
      const result = await Transaction.findByIdAndDelete(transactionId)
      if (!result) {
        throw new NotFound(`Not found`)
      }

      sendSuccessRes(res, { message: 'transaction deleted' })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = deleteById
