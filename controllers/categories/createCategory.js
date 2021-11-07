const { Category } = require('../../models')

const createCategory = async (req, res, next) => {
  try {
    const newCategory = { ...req.body, owner: req.user._id }
    // console.log(newCategory)
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
