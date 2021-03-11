const express = require('express')

const router = express.Router()

const { getCreditCardDetails } = require('../controllers/creditCardOffer')

router.get('/creditCardOffer/getCreditCardDetails', getCreditCardDetails)

module.exports = router
