const creditCardOfferSchema = require('../mongoDB/models/creditCardOffer')

const getCreditCardDetails = async (req, res) => {
    
    console.log("hey Welcome kajal");
    // const customerId  = req.body.customerId;
  
    // const creditCardData = await creditCardOfferSchema.users.find({const customerId = req.body.customerId
    // })
  
    // if (creditCardData) {
    //   return res
    //     .status(200)
    //     .send({ code: 200, message: 'creditCard Details Feteched', data: creditCardData })
    // }
   return res.status(400).send({ code: 400, message: 'Error Can not fetch' })
  }
  
  module.exports = {
    getCreditCardDetails
}  