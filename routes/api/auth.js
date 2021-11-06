const express = require('express')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user/user')
const { validation } = require('../../middlewares')

const router = express.Router()
const userValidation = validation(joiSchema)

router.post('/signup', userValidation, ctrl.signup)
router.post('/login', userValidation, ctrl.login)

module.exports = router
