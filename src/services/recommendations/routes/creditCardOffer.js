const express = require('express')

const router = express.Router()

const {
      
       insertCreditCardOffer , 
       insertCreditCardOfferDetails,
       getOfferDetails,
        
      }= require('../controllers/creditCard')

router.post('/insertCreditCardOffer', insertCreditCardOffer)

router.post('/insertCreditCardOfferDetails', insertCreditCardOfferDetails)
  
router.get('/getOfferDetails/:customerCode', getOfferDetails)

module.exports = router






