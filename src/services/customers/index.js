const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/healthCheck', (req, res) => {
  res.status(200).send({ code: 200, message: 'Its working' })
})

app.use('/bankingapp/api', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(3000, () =>
  console.log('Current Service => Customer :: Running on port number 3000'),
)
