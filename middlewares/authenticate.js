const jwt = require('jsonwebtoken')

const { User } = require('../models')
// const { SECRET_KEY } = process.env

// console.log({ SECRET_KEY })

const authenticate = async (req, res, next) => {
  // console.log(req.headers.authorization)
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
    return
  }

  const [bearer, token] = authorization.split(' ')
  // console.log([bearer, token])

  if (bearer !== 'Bearer') {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
    return
  }
  try {
    const { SECRET_KEY } = process.env
    // console.log({ SECRET_KEY })
    const { _id } = jwt.verify(token, SECRET_KEY)
    // console.log(jwt.verify(token, SECRET_KEY))
    const user = await User.findById({ _id })

    if (!user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      })
      return
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
  }
}

module.exports = authenticate
