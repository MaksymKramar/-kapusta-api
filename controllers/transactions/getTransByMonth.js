// eslint-disable-next-line no-unused-vars
const { Transaction } = require('../../models')
const { User } = require('../../models')

//http://localhost:3000/api/transactions/10?type=false
const getTransByMonth = async (req, res) => {
  const { _id } = req.user
  // const user = req.user;
  const user = await User.findById(_id)
  // console.log(user)
  const { monthId } = req.params
  const { type = null } = req.query
  const optionSearch = { owner: user._id, month: monthId }
  if (type !== null) {
    optionSearch.type = type
  }
  console.log(monthId)
  // console.log(user)
  const transactionsByUser = await Transaction.find(
    optionSearch,
    'month sum type description',
  )
  console.log(transactionsByUser)

  // const transByType = await Transaction.find({ description: description });
  // console.log(transByType);
  // console.log(Transaction)

  // try {
  //   if (!type) {
  //     const filterSum = transactionsByUser.flatMap(
  //       (transaction) => transaction.sum
  //     );
  //     console.log(filterSum);

  //     const sumByMonth = filterSum.reduce((a, b) => a + b);
  //     console.log(sumByMonth);
  //     sendSuccessRes(res, { result }, 201);
  //   } else {
  //     const filterSum = transactionsByUser.flatMap(
  //       (transaction) => transaction.sum
  //     );
  //     console.log(filterSum);

  //     const sumByMonth = filterSum.reduce((a, b) => a + b);
  //     console.log(sumByMonth);
  //     sendSuccessRes(res, { result }, 201);
  //   }
  // } catch (error) {
  //   res.status(400).json(error.message);
  // }

  // eslint-disable-next-line no-unused-vars

  const filterSum = transactionsByUser.flatMap((transaction) => transaction.sum)
  console.log(filterSum)
  const descrFilter = transactionsByUser.flatMap(
    (transaction) => transaction.description,
  )
  console.log(descrFilter)

  // const sumByDesc = descrFilter.reduce((a, b) => {
  //   if (a === b) {
  //     const sumByMonth = filterSum.reduce((a, b) => a + b)
  //     return sumByMonth
  //   }
  // })
  const sumByMonth = filterSum.reduce((a, b) => a + b)
  console.log(sumByMonth)

  // eslint-disable-next-line no-unused-vars
  // const sumByMonth = transactionsByUser.map((el) => {
  //   if (el.month === monthId) {
  //     // let newSum = [];
  //     // newSum.push(el);
  //     console.log(el);
  //   }
  // });

  // const result = await transactionsByUser.find({ month });
  // console.log(result);
}

module.exports = getTransByMonth
