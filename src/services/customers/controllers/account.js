const axios = require('axios')
const accountSchema = require('../../../mongoDB/customers/models/account')
const transactionsSchema = require('../../../mongoDB/customers/models/transaction')
const sendEmailNotification = require('../../../utils/emailNotification')
const logger = require('../../../utils/winston')

const createNewAccoount = async (req, res) => {
  try {
    const { username, closingBalance } = req.body
    const accountNumber = Date.now()

    const accontData = await accountSchema.accounts.create({
      userId: res.payload.id,
      accountNo: accountNumber,
      username,
      closingBalance,
    })

    return res
      .status(200)
      .send({ code: 200, message: 'Account Created Successfully', accontData })
  } catch (err) {
    logger.fl({
      funName: 'createNewAccoount',
      state: 'Error',
      req: req.body,
      res: { message: err.message || ' ' },
    })
    res.status(500).send({ code: 500, message: 'Internal server error' })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const getByAccountNumber = async (req, res) => {
  try {
    const { accountNo } = req.body
    const accountData = await accountSchema.accounts.find({
      accountNo,
    })

    if (accountData) {
      return res
        .status(200)
        .send({ code: 200, message: 'Account Feteched', data: accountData })
    }
    return res.status(400).send({ code: 400, message: 'Error Can not fetch' })
  } catch (err) {
    logger.fl({
      funName: 'getByAccountNumber',
      state: 'Error',
      req: req.body,
      res: { message: err.message || ' ' },
    })

    res.status(500).send({ code: 500, message: 'Internal server error' })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const getByUserName = async (req, res) => {
  try {
    const uname = req.body.username
    const accountData = await accountSchema.accounts.find({ username: uname })
    if (accountData) {
      return res
        .status(200)
        .send({ code: 200, message: 'Account Feteched', data: accountData })
    }
    return res.status(400).send({ code: 400, message: 'Error Can not fetch' })
  } catch (err) {
    res.status(500).send({ code: 500, message: 'Internal server error' })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const transferAmount = async (req, res) => {
  try {
    const userId = res.payload.id
    const transferInfo = {
      from: {
        accountNo: req.body.from.accountNo,
        amount: req.body.from.amount,
      },
      to: {
        accountNo: req.body.to.accountNo,
        amount: req.body.to.amount,
      },
      remark: req.body.remark,
    }

    const fromData = await accountSchema.accounts.findOne({
      accountNo: transferInfo.from.accountNo,
    })
    const toData = await accountSchema.accounts.findOne({
      accountNo: transferInfo.to.accountNo,
    })

    if (!fromData) {
      return res
        .status(400)
        .send({ code: 400, message: 'Account Number Not found' })
    }
    if (!toData) {
      return res
        .status(400)
        .send({ code: 400, message: 'Account Number Not found' })
    }

    if (Number(fromData.closingBalance) < Number(transferInfo.from.amount)) {
      return res.status(400).send({
        code: 400,
        message: 'Account balance is less than transfer amount',
      })
    }

    const newFromClosingAmount =
      parseFloat(fromData.closingBalance) - parseFloat(transferInfo.from.amount)

    const newtoClosingAmount =
      parseFloat(toData[0].closingBalance) + parseFloat(transferInfo.to.amount)

    Promise.all([
      await accountSchema.accounts.updateOne(
        {
          accountNo: transferInfo.from.accountNo,
        },
        {
          $set: { closingBalance: newFromClosingAmount },
        },
      ),
      await accountSchema.accounts.updateOne(
        {
          accountNo: transferInfo.to.accountNo,
        },
        {
          $set: { closingBalance: newtoClosingAmount },
        },
      ),
      await transactionsSchema.transactions.create({
        amount: transferInfo.from.amount || 0,
        transferedOn: new Date(),
        to: transferInfo.to.accountNo,
        from: transferInfo.from.accountNo,
        remark: 'SUCCESS',
        userId,
      }),
    ])

    Promise.all([
      await sendEmailNotification({
        from: 'satputenilesh0298@gmail.com',
        to: 'satputenilesh1998@gmail.com',
        text: `Avaibale balance id: ${newFromClosingAmount}`,
      }),
      await sendEmailNotification({
        from: 'satputenilesh0298@gmail.com',
        to: 'satputenilesh1998@gmail.com',
        text: `Account Credited amount: ${newtoClosingAmount}`,
      }),
    ])

    return res
      .status(200)
      .send({ code: 200, message: 'Amount transfered sucessfully' })
  } catch (error) {
    res.status(500).send({ code: 500, message: 'Internal server error', error })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const addPayees = async (req, res) => {
  try {
    const payeesData = req.body.payees
    const { accountNo } = req.body

    await accountSchema.accounts.updateOne(
      { accountNo, isClosed: false },
      {
        $addToSet: {
          payees: {
            firstname: payeesData.firstname,
            lastname: payeesData.lastname,
            accountNo: payeesData.accountNo,
          },
        },
      },
    )

    return res.status(200)
  } catch (error) {
    res.status(500).send({ code: 500, message: 'Internal server error' })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

// const deletePayees = async (req, res) => {}

const closeAccount = async (req, res) => {
  try {
    const { accountNo } = req.body

    if (!accountNo) {
      // Object.assign(obj, { email });
      return res.status(400).send({ code: 400, message: 'accountNo is empty' })
    }

    await accountSchema.accounts.updateOne(
      {
        accountNo,
      },
      {
        $set: { isClosed: true },
      },
    )
    return res.status(200).send({ code: 200, message: 'Account Closed' })
  } catch (error) {
    res.status(500).send({ code: 500, message: 'Internal server error', error })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const openClosedAccount = async (req, res) => {
  try {
    const { accountNo } = req.body

    if (!accountNo) {
      return res.status(400).send({ code: 400, message: 'accountNo is empty' })
    }

    await accountSchema.accounts.updateOne(
      {
        accountNo,
      },
      {
        $set: { isClosed: false },
      },
    )
    return res.status(200).send({ code: 200, message: 'Account Open again' })
  } catch (error) {
    res.status(500).send({ code: 500, message: 'Internal server error' })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const lastActivated = async (req, res) => {
  try {
    const currentDate = new Date()

    return res
      .status(200)
      .send({ code: 200, message: 'Last Activated', currentDate })
  } catch (error) {
    res.status(500).send({ code: 500, message: 'Internal server error' })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const updateLastActivated = async (req, res) => {
  try {
    const { accountNo } = req.body
    const currentDate = new Date()

    if (!accountNo) {
      res.status(400).send({ code: 400, message: 'accountNo is empty' })
    }

    await accountSchema.accounts.updateOne(
      {
        accountNo,
      },
      {
        $set: { lastActive: currentDate },
      },
    )
    res.status(200).send({ code: 200, message: 'Last Activate Update' })
  } catch (error) {
    res.status(500).send({ code: 500, message: 'Internal server error' })
  }

  return res
    .status(400)
    .send({ code: 400, message: 'Sometning Went to be wrong !!' })
}

const getMovieByTitle = async (req, res) => {
  const { param1, param2 } = req.query
  const options = {
    method: 'GET',
    url: `http://localhost:3000/bankingapp/api/movie/getByName?${param1}&${param2}`,
    params: {
      param1,
      param2,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }

  axios
    .request(options)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      res.send({ message: error.message || 'Something went to be wrong' })
    })
}

const getMovieByName = (req, res) => {
  const { param1, param2 } = req.query
  console.log({
    param1,
    param2,
  })
  res.send({
    code: 200,
    movieName: 'Something',
    addition: Number(param1) + Number(param2),
  })
}

module.exports = {
  createNewAccoount,
  getByAccountNumber,
  getByUserName,
  transferAmount,
  addPayees,
  // getPayees,
  // deletePayees,
  closeAccount,
  openClosedAccount,
  lastActivated,
  updateLastActivated,
  getMovieByTitle,
  getMovieByName,
}
