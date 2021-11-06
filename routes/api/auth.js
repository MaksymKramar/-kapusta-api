const express = require('express')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user/user')
const { validation, authenticate } = require('../../middlewares')

const router = express.Router()
const userValidation = validation(joiSchema)

router.post('/signup', userValidation, ctrl.signup)
router.post('/login', userValidation, ctrl.login)
router.get('/logout', authenticate, ctrl.logout)
router.patch('/', authenticate, ctrl.updateBalance)

module.exports = router
