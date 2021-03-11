const express = require('express')

const router = express.Router()

const {
      
       insertCreditCardOffer , 
       insertcreditCardOfferDetails
       
      }= require('../controllers/creditCard')

router.get('/creditCardOffer/insertCreditCardOffer', insertCreditCardOffer)

router.get('/creditCardOffer/insertcreditCardOfferDetails', insertcreditCardOfferDetails)
  
module.exports = router

