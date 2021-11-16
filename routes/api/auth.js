const express = require('express')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user/user')
const { validation, authenticate } = require('../../middlewares')
const tryCatchWrapper = require('../../helpers/try-catch-wrapper')
// const { googleAuth, googleRedirect } = require('./auth.controller')

const router = express.Router()
const userValidation = validation(joiSchema)

router.post('/signup', userValidation, ctrl.signup)
router.post('/login', userValidation, ctrl.login)
router.get('/logout', authenticate, ctrl.logout)
router.patch('/user', authenticate, ctrl.updateBalance)
router.get('/user/current', authenticate, ctrl.current)

router.get('/google', tryCatchWrapper(ctrl.googleAuth))

router.get('/google-redirect', tryCatchWrapper(ctrl.googleRedirect))

module.exports = router
