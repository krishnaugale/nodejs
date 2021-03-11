const mongoose = require('mongoose')

const dbcreditCard = async () => {
  await mongoose.connect('mongodb://localhost:27017/recommondation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}
module.exports = dbcreditCard
