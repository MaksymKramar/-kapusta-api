/* eslint-disable no-undef */
const { Transaction } = require("../../models");
const { sendSuccessRes } = require("../../utils");
const { v4 } = require("uuid");

// eslint-disable-next-line no-unused-vars
const addExpenses = async (req, res) => {
  // console.log(req.user);
  const { _id } = req.user;
  const newTransaction = { ...req.body, id: v4(), owner: _id };

  try {
    const result = await Transaction.create(newTransaction);
    sendSuccessRes(res, { result }, 201);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = addExpenses;
