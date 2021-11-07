const express = require('express')
const router = express.Router()
const { joiSchema } = require('../../models/categories/categories')
const { validation, authenticate } = require('../../middlewares')
const { categories: ctrl } = require('../../controllers')

const categoryValidation = validation(joiSchema)

router.get('/', ctrl.getAllCategories)
router.post('/', authenticate, categoryValidation, ctrl.createCategory)
router.delete('/:categoryId', authenticate, ctrl.deleteCategory)

module.exports = router
