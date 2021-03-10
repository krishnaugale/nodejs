const express = require('express')
const morgan = require('morgan')

const app = express()
const bodyParser = require('body-parser')
const routes = require('./src/routes')
const dbConnect = require('./src/mongoDB/connection')
const dbcreditCard = require('./src/mongoDB/creditcardconnection')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dbConnect()
  .then(() =>
    console.log('Database Connected mongodb://localhost:27017/easybanking'),
  )
  .catch(err => console.log(err))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/healthCheck', (req, res) => {
  res.status(200).send({ code: 200, message: 'Its working' })
})

app.use('/bankingapp/api', routes)

app.listen(3000, () =>
  console.log('info', 'Server Listing On Port Number 3000'),
)


dbcreditCard()
  .then(() =>
    console.log('Database Connected mongodb://localhost:27017/recommondation'),
  )
  .catch(err => console.log(err))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/healthCheck1', (req, res) => {
  res.status(200).send({ code: 200, message: 'Its working ' })
})

app.use('/bankingapp/api', routes)

app.listen(3001, () =>
  console.log('info', 'Server Listing On Port Number 3001'),
)
