const express = require('express')
const morgan = require('morgan')

const app = express()
const bodyParser = require('body-parser')
const routes = require('./src/routes')
const dbConnect = require('./src/mongoDB/connection')
const logger = require('./src/utils/winston')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dbConnect()
  .then(data =>
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
