const express = require('express')
const router = express.Router()

const { authenticate, validation } = require('../../middlewares')
const {
  joiTransactionSchema,
} = require('../../models/transactions/transactions')
const { transactions: ctrl } = require('../../controllers/')

// router.get("/", authenticate, ctrl.getAllTransactions);
router.post(
  '/incomes',
  authenticate,
  validation(joiTransactionSchema),
  ctrl.addIncomes,
)
router.post(
  '/expenses',
  authenticate,
  validation(joiTransactionSchema),
  ctrl.addExpenses,
)
router.delete('/:transactionId', authenticate, ctrl.deleteById)

router.post(
  '/add',
  authenticate,
  validation(joiTransactionSchema),
  ctrl.addTransaction,
)

router.get(
  '/:date',
  authenticate,
  // validation(joiTransactionSchema),
  ctrl.getTransByMonth,
)

router.get(
  '/',
  authenticate,
  // validation(joiTransactionSchema),
  ctrl.getFullTransInfo,
)

module.exports = router
