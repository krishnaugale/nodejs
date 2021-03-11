const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const route = require('./routes/index')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/healthCheck', (req, res) => {
  res.status(200).send({ code: 200, message: 'Its working' })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/bankingapp/api', route)

// app.use((req, res, next) => {
//  const err = new Error('Not Found')
//  err.status = 404
//  next(err)
// })

app.listen(4000, () =>
  console.log(
    'Current Service=> Recommondation :: Running on port number 4000',
  ),
)
