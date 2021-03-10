
const mongoose = require('mongoose')
const { creditCards } = require('./models/creditCardOffer')

const dbcreditCard = async () => {
  await mongoose.connect('mongodb://localhost:27017/recommondation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}
module.exports = dbcreditCard
