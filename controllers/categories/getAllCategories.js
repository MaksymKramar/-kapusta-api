const { Category } = require('../../models')

const getAllCategories = async (req, res, next) => {
  try {
    const { _id } = req.user
    const searchOption = { owner: _id }
    const categories = await Category.find(searchOption, '_id title type owner')
    res.json({
      status: '✔️ Success',
      code: 200,
      categories,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllCategories
