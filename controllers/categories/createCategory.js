const { Category } = require('../../models')
const { Conflict } = require('http-errors')

const createCategory = async (req, res, next) => {
  try {
    const { title } = req.body
    const category = await Category.findOne({ title, owner: req.user._id })
    if (category) {
      throw new Conflict(`Category already exist`)
    }

    const newCategory = { ...req.body, owner: req.user._id }
    const result = await Category.create(newCategory)
    res.status(201).json({
      status: 'sucess',
      code: 201,
      message: `✔️ Category '${req.body.title}' added`,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = createCategory
