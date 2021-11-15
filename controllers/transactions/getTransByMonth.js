// eslint-disable-next-line no-unused-vars
const { Transaction } = require("../../models");
const { User } = require("../../models");

// eslint-disable-next-line no-unused-vars
const getTransByMonth = async (req, res) => {
  const { _id } = req.user;
  // const user = req.user;
  const user = await User.findById(_id);
  // console.log(user._id);
  const transactionsByUser = await Transaction.find(
    { owner: user._id },
    "month sum type"
  );

  console.log(transactionsByUser);

  // eslint-disable-next-line no-unused-vars
  const { monthId } = req.params;

  // eslint-disable-next-line no-unused-vars
  const sumByMonth = transactionsByUser.map((el) => {
    if (el.month === monthId) {
      // let newSum = [];
      // newSum.push(el);
      console.log(el);
    }
  });
  // console.log(sumByMonth);

  // const result = await transactionsByUser.find({ month });
  // console.log(result);
};

module.exports = getTransByMonth;
