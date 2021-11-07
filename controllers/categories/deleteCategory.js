const { Category } = require('../../models')

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const category = { categoryId, owner: req.user._id }
    // console.log(category)
    const result = await Category.findByIdAndDelete(category.categoryId)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `❌ Category with ID=${category.categoryId} not found`,
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: ' ✔️ Category deleted',
    })
  } catch (error) {
    next(error)
  }
}
module.exports = deleteCategory
