const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const dbConnect = require('../../mongoDB/customers/connection')

const app = express()

dbConnect()
  .then(() =>
    console.log('Database Connected mongodb://localhost:27017/easybanking'),
  )
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/healthCheck', (req, res) => {
  res.status(200).send({ code: 200, message: 'Its working' })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use('/bankingapp/api', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(3000, () =>
  console.log('Current Service => Customer :: Running on port number 3000'),
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
