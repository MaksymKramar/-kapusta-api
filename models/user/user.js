const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const emailRegexp = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+.[a-z]{2,4}$/

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
)
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  balance: Joi.number(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}
