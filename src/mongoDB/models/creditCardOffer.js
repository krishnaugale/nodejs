const mongoose = require('mongoose')

const creditCardOfferSchema = new mongoose.Schema({
  
  customerCode: String,
  offer1 : String,
  offer2 :  String,
  offer3 :  String,
  offer4 :  String,
  offer5 :  String,
  
})

exports.creditCards = mongoose.model('creditCards', creditCardOfferSchema)
