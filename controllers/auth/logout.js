const { User } = require('../../models')

// eslint-disable-next-line no-unused-vars
const logout = async (req, res, next) => {
  try {
    const { _id } = req.user
    console.log(req.user)
    await User.findByIdAndUpdate(_id, { token: null })

    res.status(204).json({
      status: 'success',
      code: 204,
      message: `✔️ Logout`,
    })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = logout
