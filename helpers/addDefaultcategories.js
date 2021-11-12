const { Category } = require('../models')
const categories = require('./categories.json')

const addDefaultcategories = async (id) => {
  const defaultCategories = categories.map((categ) => ({ ...categ, owner: id }))
  await Category.create(defaultCategories)
}

module.exports = addDefaultcategories
