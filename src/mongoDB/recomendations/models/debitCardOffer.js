const mongoose = require('mongoose')

const { Schema } = mongoose

const { recomendation } = require('../../connection')

const debitCardOfferSchema = new Schema({
  customerCode: String,
  parameter1: String,
  parameter2: String,
  parameter3: String,
  parameter4: String,
  parameter5: String,
})

const debitCardOffer = recomendation.model(
  'debitCardOffer',
  debitCardOfferSchema,
)

module.exports = {
  debitCardOffer,
}
