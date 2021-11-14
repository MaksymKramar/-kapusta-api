const { Schema, model } = require('mongoose')
const Joi = require('joi')

const categorySchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    type: {
      type: Boolean,
      required: [true, 'type is required'],
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const joiSchema = Joi.object({
  title: Joi.string().min(2).max(15),
  type: Joi.boolean(),
})

const Category = model('categories', categorySchema)

module.exports = {
  Category,
  joiSchema,
}
