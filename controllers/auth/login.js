const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const { NotFound } = require('http-errors')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    // console.log(user)

    if (!user || !user.comparePassword(password)) {
      // res.json({
      //   status: 'error',
      //   code: 400,
      //   message: 'Email or password is wrong',
      // })
      throw new NotFound('Email or password is wrong')
    }
    const { _id } = user
    const payload = {
      _id,
    }
    console.log(payload)
    const { SECRET_KEY } = process.env

    const token = jwt.sign(payload, SECRET_KEY)

    await User.findByIdAndUpdate(user._id, { token })

    res.json({
      status: '✔️ Success',
      code: 200,
      data: {
        name: user.name,
        email: user.email,
        token,
      },
    })
  } catch (error) {
    console.log(error.message)
    res.status(400).json(error)
  }
}

module.exports = login
