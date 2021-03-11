const mongoose = require('mongoose')

const { Schema } = mongoose

const { recomendation } = require('../../connection')

const creditCardOfferDetailsSchema = new Schema({
    offerId: String,
    expiredOn: String,
    offerTitle: String,
    offerDescription: String,
    cardImage: String,
    promoCode: String,

})
const creditCardOfferDetails = recomendation.model(
  'creditCardOfferDetails',
  creditCardOfferDetailsSchema,
)

module.exports = {
    creditCardOfferDetails,
}
