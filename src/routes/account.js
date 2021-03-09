const express = require('express')

const router = express.Router()
const {
  createNewAccoount,
  getByAccountNumber,
  getByUserName,
  transferAmount,
  addPayees,
  getPayees,
  // deletePayees,
  closeAccount,
  openClosedAccount,
  lastActivated,
  updateLastActivated,
} = require('../controllers/account')

const { iscreateNewAccoount } = require('../validators/account')

const auth = require('../middelware/auth')

router.post(
  '/account/createNewAccount',
  auth,
  [iscreateNewAccoount],
  createNewAccoount,
)

router.get('/account/getByAccountNumber', auth, getByAccountNumber)

router.get('/account/getByUserName', auth, getByUserName)

router.post('/account/transferAmount', auth, transferAmount)

router.post('/account/addPayees/:accountNo', auth, addPayees)

router.get('/account/getPayees', auth, getPayees)

// router.post('/account/deletePayees', auth, deletePayees)

router.post('/account/closeAccount', auth, closeAccount)

router.post('/account/openClosedAccount', auth, openClosedAccount)

router.get('/account/lastActivated', auth, lastActivated)

router.post('/account/updateLastActivated', auth, updateLastActivated)

module.exports = router
