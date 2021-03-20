const mongoose = require('mongoose')

const makeNewConnection = uri => {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  db.on('error', error => {
    console.log(`MongoDB :: connection ${JSON.stringify(error)}`)
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${uri}`),
    )
  })

  db.on('connected', () => {
    console.log(`MongoDB :: connected  ${uri}`)
  })

  db.on('disconnected', () => {
    console.log(`MongoDB :: disconnected ${uri}`)
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
