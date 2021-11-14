const { Transaction, User } = require('../../models')
const { sendSuccessRes } = require('../../utils')
const { NotFound } = require('http-errors')

// eslint-disable-next-line no-unused-vars
const deleteById = async (req, res) => {
  // console.log(req.params);
  const { _id } = req.user
  const user = await User.findById(_id)
  console.log(user.balance)
  const { transactionId } = req.params
  const result = await Transaction.findByIdAndDelete(transactionId)
  console.log(result.sum)
  if (!result) {
    throw new NotFound(`Not found`) /* Проброс в error catch */
  }

  sendSuccessRes(res, { message: 'transaction deleted' })
}

module.exports = deleteById
