const { Transaction } = require('../../models')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')
const { BadRequest, NotFound } = require('http-errors')

//http://localhost:3000/api/transactions/10.2021?type=false
const getTransByMonth = async (req, res) => {
  try {
    const { _id } = req.user
    const user = await User.findById(_id)
    const { date } = req.params

    const [month, year] = date.split('.')
    const { type = null } = req.query
    const optionSearch = { owner: user._id, month: month, year: year }
    if (type !== null) {
      optionSearch.type = type
    }
    if (
      month > 12 ||
      month < 0 ||
      month.length !== 2 ||
      year.length !== 4 ||
      type === null
    ) {
      throw new BadRequest(
        'Check searchQuery, example: "http://localhost:3000/api/transactions/10.2021?type=false"  ',
      )
    }

    const transactionsByUser = await Transaction.find(
      optionSearch,
      '_id date sum type category description',
    )
    if (!transactionsByUser.length) {
      throw new NotFound('There is no any transaction ')
    }
    const totalAmount = transactionsByUser
      .map((item) => item.sum)
      .reduce((a, b) => a + b)

    sendSuccessRes(res, { transactionsByUser, totalAmount }, 200)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = getTransByMonth
