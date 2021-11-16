const { Transaction } = require('../../models')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

//http://localhost:3000/api/transactions/10.2021?type=false
const getTransByMonth = async (req, res) => {
  const { _id } = req.user
  // const user = req.user;
  const user = await User.findById(_id)
  // console.log(user)
  const { date } = req.params
  // console.log(date)
  const [month, year] = date.split('.')
  // console.log(month, year)

  const { type = null } = req.query
  const optionSearch = { owner: user._id, month: month, year: year }
  if (type !== null) {
    optionSearch.type = type
  }

  const transactionsByUser = await Transaction.find(
    optionSearch,
    'date sum type description',
  )

  const totalAmount = transactionsByUser
    .map((item) => item.sum)
    .reduce((a, b) => a + b)

  sendSuccessRes(res, { transactionsByUser, totalAmount }, 200)
}

module.exports = getTransByMonth
