const express = require('express')
const router = express.Router()

const { authenticate, validation } = require('../../middlewares')
const {
  joiTransactionSchema,
} = require('../../models/transactions/transactions')
const { transactions: ctrl } = require('../../controllers/')

router.delete('/:transactionId', authenticate, ctrl.deleteById)

router.post(
  '/add',
  authenticate,
  validation(joiTransactionSchema),
  ctrl.addTransaction,
)

router.get('/:date', authenticate, ctrl.getTransByMonth)
router.get('/', authenticate, ctrl.getFullTransInfo)

module.exports = router
