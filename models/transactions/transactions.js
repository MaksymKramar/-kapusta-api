const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    date: {
      type: String,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    type: {
      type: Boolean,
      // default: false,
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
  date: Joi.string(),
  description: Joi.string(),
  category: Joi.string().required(),
  sum: Joi.number(),
  type: Joi.boolean().required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, joiTransactionSchema };
