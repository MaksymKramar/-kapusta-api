const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    //   date: {
    //     type: Date,
    //   },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["expenses", "incomes"],
    },
    sum: {
      type: Number,
    },
  },
  { versionKey: false }
);

const joiTransactionSchema = Joi.object({
  //   date: Joi.date(),
  description: Joi.string(),
  category: Joi.string(),
  sum: Joi.number(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, joiTransactionSchema };
