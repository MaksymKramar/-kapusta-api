// eslint-disable-next-line no-unused-vars
const { Transaction } = require("../../models");
const { User } = require("../../models");

// eslint-disable-next-line no-unused-vars
const getTransByMonth = async (req, res) => {
  const { _id } = req.user;
  // const user = req.user;
  const user = await User.findById(_id);
  // console.log(user);
  const { monthId } = req.params;
  const transactionsByUser = await Transaction.find(
    { owner: user._id, month: monthId, type: true },
    "month sum type"
  );
  console.log(transactionsByUser);

  // const transByType = await Transaction.find({ type: false });
  // console.log(transByType);

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

  const filterSum = transactionsByUser.flatMap(
    (transaction) => transaction.sum
  );
  console.log(filterSum);

  const sumByMonth = filterSum.reduce((a, b) => a + b);
  console.log(sumByMonth);

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
};

module.exports = getTransByMonth;
