const mongoose = require('mongoose')
const transactionSchema = require('../mongoDB/models/transaction')
const jwtSign = require('../utils/jwtSign')

const logtransactionsummary = async (req, res) => {
  try {
    const transactionInfo = {
      amount: req.body.amount,
      transferedOn: req.body.transferedOn,
      to: req.body.to,
      from: req.body.from,
      remark: req.body.remark,
    }
    const transactionSummary = await transactionSchema.transactions.findOne(
      transactionInfo,
    )

    if (!transactionSummary) {
      return res
        .status(400)
        .send({ code: 400, message: 'Transaction not found' })
    }
    return res
      .status(200)
      .send({ code: 200, message: 'Transaction Fetch', transactionSummary })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const transactionsummary = async (req, res) => {
  try {
    const { accountNo } = req.params
    const transactionSummary = await transactionSchema.transactions.find({
      from: accountNo,
    })

    if (!transactionSummary) {
      return
      res.status(400).send({ code: 400, message: 'Account Number Not found' })
    }
    return res.status(200).send({
      code: 200,
      message: 'Transaction Summary Fetch',
      transactionSummary,
    })
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const generatestatement = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

module.exports = {
  generatestatement,
  transactionsummary,
  logtransactionsummary,
}
