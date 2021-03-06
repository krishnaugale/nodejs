const mongoose = require("mongoose");
const accountSchema = require("../mongoDB/models/account");
const transactionsSchema = require("../mongoDB/models/transaction");
const sendEmailNotification = require("../services/emailNotification");
const logger = require("../utils/winston");

const createNewAccoount = async (req, res) => {
  try {
    throw Error('error')
    const { username, closingBalance } = req.body;
    const accountNumber = Date.now();

    const accontData = await accountSchema.accounts.create({
      userId: res.payload.id,
      accountNo: accountNumber,
      username,
      closingBalance,
    });

    return res
      .status(200)
      .send({ code: 200, message: "Account Created Successfully", accontData });
  } catch (err) {
    logger.log(err);
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const getByAccountNumber = async (req, res) => {
  try {
    const accountNo = req.body.accountNo;
    const accountData = await accountSchema.accounts.find({
      accountNo,
    });

    if (accountData) {
      return res
        .status(200)
        .send({ code: 200, message: "Account Feteched", data: accountData });
    }
    return res.status(400).send({ code: 400, message: "Error Can not fetch" });
  } catch (err) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const getByUserName = async (req, res) => {
  try {
    const uname = req.body.username;
    const accountData = await accountSchema.accounts.find({ username: uname });
    if (accountData) {
      return res
        .status(200)
        .send({ code: 200, message: "Account Feteched", data: accountData });
    }
    return res.status(400).send({ code: 400, message: "Error Can not fetch" });
  } catch (err) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const transferAmount = async (req, res) => {
  try {
    const userId = res.payload.id;
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
    };

    const fromData = await accountSchema.accounts.findOne({
      accountNo: transferInfo.from.accountNo,
    });
    const toData = await accountSchema.accounts.findOne({
      accountNo: transferInfo.to.accountNo,
    });

    if (!fromData) {
      return res
        .status(400)
        .send({ code: 400, message: "Account Number Not found" });
    }
    if (!toData) {
      return res
        .status(400)
        .send({ code: 400, message: "Account Number Not found" });
    }

    if (Number(fromData.closingBalance) < Number(transferInfo.from.amount)) {
      return res.status(400).send({
        code: 400,
        message: "Account balance is lessthan transfe amount",
      });
    }

    const newFromClosingAmount =
      parseFloat(fromData.closingBalance) -
      parseFloat(transferInfo.from.amount);

    const newtoClosingAmount =
      parseFloat(toData.closingBalance) + parseFloat(transferInfo.to.amount);

    Promise.all([
      await accountSchema.accounts.updateOne(
        {
          accountNo: transferInfo.from.accountNo,
        },
        {
          $set: { closingBalance: newFromClosingAmount },
        }
      ),
      await accountSchema.accounts.updateOne(
        {
          accountNo: transferInfo.to.accountNo,
        },
        {
          $set: { closingBalance: newtoClosingAmount },
        }
      ),
      await transactionsSchema.transactions.create({
        amount: transferInfo.from.amount || 0,
        transferedOn: new Date(),
        to: transferInfo.to.accountNo,
        from: transferInfo.from.accountNo,
        remark: "SUCCESS",
        userId,
      }),
    ]);

    // Promise.all([
    //   await sendEmailNotification({
    //     from: "emal",
    //     to: "email",
    //     text: `Avaibale balance id: ${newFromClosingAmount}`,
    //   }),
    //   await sendEmailNotification({
    //     from: "emal",
    //     to: "email",
    //     text: `Account Credited amount: ${newtoClosingAmount}`,
    //   }),
    // ]);

    return res
      .status(200)
      .send({ code: 200, message: "Amount transfered sucessfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ code: 500, message: "Internal server error", error });
  }
};

const addPayees = async (req, res) => {
  try {
    const accountNo = req.params.accountNo;
    const payeesData = req.body.payees;

    const payees = await accountSchema.accounts.updateOne(
      { accountNo, isClosed: false },
      {
        $addToSet: {
          payees: {
            firstname: payeesData.firstname,
            lastname: payeesData.lastname,
            accountNo: payeesData.accountNo,
          },
        },
      }
    );

    return res
      .status(200)
      .send({ code: 200, message: "Account Created Successfully", accontData });
  } catch (error) {
    res
      .status(500)
      .send({ code: 500, message: "Internal server error", error });
  }
};

const getPayees = async (req, res) => {
  try {
    const accNumber = req.body.accountNo;
    const accountData = await accountSchema.accounts.find({
      accountNo: accNumber,
    });

    if (accountData && accountData.payees) {
      return res
        .status(200)
        .send({ code: 200, message: "Account Feteched", data: accountData });
    }

    return res.status(400).send({ code: 400, message: "Error Can not fetch" });
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const deletePayees = async (req, res) => {};

const closeAccount = async (req, res) => {
  try {
    const accountNo = req.body.accountNo;

    if (!accountNo) {
      // Object.assign(obj, { email });
      return res.status(400).send({ code: 400, message: "accountNo is empty" });
    }

    await accountSchema.accounts.updateOne(
      {
        accountNo: accountNo,
      },
      {
        $set: { isClosed: true },
      }
    );
    return res.status(200).send({ code: 200, message: "Account Closed" });
  } catch (error) {
    res
      .status(500)
      .send({ code: 500, message: "Internal server error", error });
  }
};

const openClosedAccount = async (req, res) => {
  try {
    const accountNo = req.body.accountNo;

    if (!accountNo) {
      return res.status(400).send({ code: 400, message: "accountNo is empty" });
    }

    await accountSchema.accounts.updateOne(
      {
        accountNo: accountNo,
      },
      {
        $set: { isClosed: false },
      }
    );
    return res.status(200).send({ code: 200, message: "Account Open again" });
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const lastActivated = async (req, res) => {
  try {
    const currentDate = new Date();

    return res
      .status(200)
      .send({ code: 200, message: "Last Activated", currentDate });
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updateLastActivated = async (req, res) => {
  try {
    const accountNo = req.body.accountNo;
    const currentDate = new Date();

    if (!accountNo) {
      res.status(400).send({ code: 400, message: "accountNo is empty" });
    }

    await accountSchema.accounts.updateOne(
      {
        accountNo: accountNo,
      },
      {
        $set: { lastActive: currentDate },
      }
    );
    res.status(200).send({ code: 200, message: "Last Activate Update" });
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

module.exports = {
  createNewAccoount,
  getByAccountNumber,
  getByUserName,
  transferAmount,
  addPayees,
  getPayees,
  deletePayees,
  closeAccount,
  openClosedAccount,
  lastActivated,
  updateLastActivated,
};
