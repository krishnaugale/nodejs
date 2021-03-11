const mongoose = require('mongoose')

const makeNewConnection = uri => {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  db.on('error', error => {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`)
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`),
    )
  })

  db.on('connected', () => {
    console.log(`MongoDB :: connected`)
  })

  db.on('disconnected', () => {
    console.log(`MongoDB :: disconnected ${this.name}`)
  })

  return db
}

const easybanking = makeNewConnection('mongodb://127.0.0.1:27017/easybanking')
const recomendation = makeNewConnection(
  'mongodb://127.0.0.1:27017/recomendation',
)

module.exports = {
  easybanking,
  recomendation,
}

// const mongoose = require('mongoose')

// const dbConnect = async () => {
//  await mongoose.connect('mongodb://localhost:27017/easybanking', {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    useCreateIndex: true,
//  })
// }

// module.exports = dbConnect
