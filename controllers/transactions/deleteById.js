const { Transaction } = require("../../models");
const { sendSuccessRes } = require("../../utils");
const { NotFound } = require("http-errors");

// eslint-disable-next-line no-unused-vars
const deleteById = async (req, res) => {
  // console.log(req.params);
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndDelete(transactionId);

  if (!result) {
    throw new NotFound(`Not found`); /* Проброс в error catch */
  }

  sendSuccessRes(res, { message: "transaction deleted" });
};

module.exports = deleteById;
