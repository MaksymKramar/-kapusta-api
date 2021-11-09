const { Transaction } = require("../../models");
const { sendSuccessRes } = require("../../utils");
const { v4 } = require("uuid");

// eslint-disable-next-line no-unused-vars
const addExpenses = async (req, res) => {
  // const { _id } = req.user;
  const newTransaction = { ...req.body, id: v4() };

  const result = await Transaction.create(newTransaction);
  sendSuccessRes(res, { result }, 201);
};

module.exports = addExpenses;
