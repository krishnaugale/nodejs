const express = require('express')

const router = express.Router()

const {
  logtransactionsummary,
  transactionsummary,
  generatestatement,
} = require('../controllers/transaction')

const { isTransactionValid } = require('../validators/transaction')

const auth = require('../middelware/auth')

router.post(
  '/transaction/logtransactionsummary',
  auth,
  [isTransactionValid],
  logtransactionsummary,
)

router.get(
  '/transaction/transactionsummary/:accountNo',
  auth,
  transactionsummary,
)

router.get('/transaction/generatestatement', auth, generatestatement)

module.exports = router
