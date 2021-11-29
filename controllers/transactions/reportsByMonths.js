const { Transaction } = require('../../models')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')
// const { BadRequest, NotFound } = require('http-errors')

//http://localhost:3000/api/transactions/10.2021?type=false
const reportsByMonths = async (req, res) => {
  try {
    const { _id } = req.user
    const user = await User.findById(_id)
    // const { date } = req.params

    const totalReport = await Transaction.aggregate([
      {
        $match: {
          owner: user._id,
        },
      },
      {
        $group: {
          _id: {
            month: '$month',
            year: '$year',
            type: '$type',
          },
          total: { $sum: '$sum' },
        },
      },
      {
        $project: {
          _id: 1,
          sum: 1,
          month: 1,
          year: 1,
          type: 1,
          category: 1,
          description: 1,
          total: 1,
        },
      },
      {
        $sort: {
          month: 1,
          type: 1,
          year: 1,
          total: 1,
        },
      },
    ])

    sendSuccessRes(res, { totalReport }, 200)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = reportsByMonths
