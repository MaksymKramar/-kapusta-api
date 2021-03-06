const { Transaction } = require('../../models')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')
const { BadRequest } = require('http-errors')

const getTransByMonthAndYear = async (req, res) => {
  try {
    const { _id } = req.user
    const user = await User.findById(_id)
    const { date } = req.query
    const { type = null } = req.query
    const [month, year] = date.split('.')
    const typeBool = JSON.parse(type)
    const monthNum = Number(month)
    const yearNum = Number(year)
    console.log(monthNum)
    console.log(yearNum)

    if (
      month > 12 ||
      month < 0 ||
      month.length !== 2 ||
      year.length !== 4 ||
      type === null
    ) {
      throw new BadRequest(
        'Check searchQuery, example: "http://localhost:3000/api/transactions/?type=true&date=09.2020"  ',
      )
    }

    const sums = await Transaction.aggregate([
      {
        $match: {
          owner: user._id,
          month: monthNum,
          year: yearNum,
          type: typeBool,
        },
      },
      {
        $group: {
          _id: {
            month: '$month',
            year: '$year',
            description: '$description',
            category: '$category',
            type: '$type',
          },
          total: { $sum: '$sum' },
        },
      },

      {
        $project: {
          _id: 0,
          group: '$_id',
          total: 1,
        },
      },
    ])
    const categorySums = await Transaction.aggregate([
      {
        $match: {
          owner: user._id,
          month: monthNum,
          year: yearNum,
          type: typeBool,
        },
      },
      {
        $group: {
          _id: {
            month: '$month',
            year: '$year',
            category: '$category',
            type: '$type',
          },
          totalCategory: { $sum: '$sum' },
        },
      },

      {
        $project: {
          _id: 0,
          group: '$_id.category',
          totalCategory: 1,
        },
      },
    ])
    if (!sums.length) {
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'there is no transactions',
        data: [],
      })
    }
    sendSuccessRes(res, { sums, categorySums }, 200)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = getTransByMonthAndYear
