const mongoose = require('mongoose')

const { Schema } = mongoose

const { recomendation } = require('../../connection')

const debitCardOfferDetailsSchema = new Schema({
  offerId: String,
  expiredOn: String,
  offerTitle: String,
  offerDescription: String,
  cardImage: String,
  promoCode: String,
})

const debitCardOfferDetails = recomendation.model(
  'debitCardOfferDetails',
  debitCardOfferDetailsSchema,
)

module.exports = {
  debitCardOfferDetails,
}
