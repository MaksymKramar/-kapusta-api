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
      required: true,
      enum: ["expenses", "incomes"],
    },
    sum: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const joiTransactionSchema = Joi.object({
  //   date: Joi.date(),
  description: Joi.string(),
  category: Joi.string().required(),
  sum: Joi.number(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, joiTransactionSchema };
