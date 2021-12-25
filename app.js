const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const authRouter = require('./routes/api/auth')
const categoryRouter = require('./routes/api/categories')
const transactionRouter = require('./routes/api/transactions')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/transactions', transactionRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const {
    status = 500,
    message = 'Server error',
  } = err /* default error (4args) */
  res.status(status).json({ message })
})

module.exports = app
