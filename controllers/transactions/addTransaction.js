const { Transaction, User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const addTransaction = async (req, res) => {
  //   console.log(req.body.type)
  const { _id } = req.user
  const { type } = req.body
  const { sum } = req.body

  console.log(type)

  const newTransaction = { ...req.body, owner: _id }
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

  //   console.log(user.balance)

  //   if (!type) {
  //     const newBalance = user.balance - sum

  //       await User.findByIdAndUpdate(
  //         _id,
  //         { balance: newBalance },
  //         {
  //           new: true,
  //         },
  //       )
  //       const result = await Transaction.create(newTransaction)

  //   }
  //   const newBalance = user.balance + sum

  //   await User.findByIdAndUpdate(
  //     _id,
  //     { balance: newBalance },
  //     {
  //       new: true,
  //     },
  //   )
  //   const result = await Transaction.create(newTransaction)
  //   sendSuccessRes(res, { result }, 201)

  //   console.log(newBalance)

  //   try {
  //     await User.findByIdAndUpdate(
  //       _id,
  //       { balance: newBalance },
  //       {
  //         new: true,
  //       },
  //     )
  //     const result = await Transaction.create(newTransaction)
  //     sendSuccessRes(res, { result }, 201)
  //   } catch (error) {
  //     res.status(400).json(error.message)
  //   }
}

module.exports = addTransaction
