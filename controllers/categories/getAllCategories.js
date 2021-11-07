const { Category } = require('../../models')

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}, '_id title type')
    res.json({
      status: 'success',
      code: 200,
      categories,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllCategories
