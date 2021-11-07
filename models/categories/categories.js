const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const categorySchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    type: {
      type: String,
      enum: ['expenses', 'incomes'],
      required: [true, 'type is required'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const joiSchema = Joi.object({
  title: Joi.string().min(2).max(15),
  type: Joi.string(),
})

const Category = model('categories', categorySchema)

module.exports = {
  Category,
  joiSchema,
}
