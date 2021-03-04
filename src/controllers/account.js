const mongoose = require("mongoose");
const accountSchema = require("../mongoDB/models/account");
const transactionsSchema = require("../mongoDB/models/transaction");

const createNewAccoount = async (req, res) => {
  try {
    const { username, closingBalance } = req.body;
    const accountNumber = Date.now();

    const accontData = await accountSchema.accounts.create({
      userId: res.payload.id,
      accountNo: accountNumber,
      username,
      closingBalance,
    });

    res
      .status(200)
      .send({ code: 200, message: "Account Created Successfully", accontData });
  } catch (err) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const getByAccountNumber = async (req, res) => {
  try {
    const accNumber = req.body.accountNo;
    const accountData = await accountSchema.accounts.find({
      accountNo: accNumber,
    });
    console.log("fetched");
    if (accountData) {
      res
        .status(200)
        .send({ code: 200, message: "Account Feteched", data: accountData });
    } else {
      res.status(400).send({ code: 400, message: "Error Can not fetch" });
    }
  } catch (err) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const getByUserName = async (req, res) => {
  try {
    console.log("Something");
    const uname = req.body.username;
    const accountData = await accountSchema.accounts.find({ username: uname });
    console.log("fetched");
    if (accountData) {
      res
        .status(200)
        .send({ code: 200, message: "Account Feteched", data: accountData });
    } else {
      res.status(400).send({ code: 400, message: "Error Can not fetch" });
    }
  } catch (err) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const transferAmount = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const addPayees = async (req, res) => {
  try {
    const accNumber = req.params.accountNo;
    console.log(accNumber);
    // const payees = await accountSchema.accounts.find({ accountNo: accNumber})
    const payees = await accountSchema.accounts.updateOne(
      { accountNo: accNumber, isClosed: false },
      {
        $addToSet: {
          payees: {
            firstname: "rishabh",
            lastname: "Sancheti",
            "accountNo ": "123456789",
          },
        },
      }
    );

    console.log(payees);
    res
      .status(200)
      .send({ code: 200, message: "Account Created Successfully", accontData });
  } catch (error) {
    //console.log(error);
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
    console.log("fetched");
    if (accountData.payees) {
      res
        .status(200)
        .send({ code: 200, message: "Account Feteched", data: accountData });
    } else {
      res.status(400).send({ code: 400, message: "Error Can not fetch" });
    }
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
      res.status(400).send({ code: 400, message: "accountNo is empty" });
    }
    console.log(accountNo);
    await accountSchema.accounts.updateOne(
      {
        accountNo: accountNo,
      },
      {
        $set: { isClosed: true },
      }
    );
    res.status(200).send({ code: 200, message: "Account Closed" });
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
      // Object.assign(obj, { email });
      res.status(400).send({ code: 400, message: "accountNo is empty" });
    }

    await accountSchema.accounts.updateOne(
      {
        accountNo: accountNo,
      },
      {
        $set: { isClosed: false },
      }
    );
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }

  res.status(200).send({ code: 200, message: "Account Open again" });
};

const lastActivated = async (req, res) => {
  try {
    const currentDate = new Date();
    console.log(currentDate);

    if (!currentDate) {
      // Object.assign(obj, { email });
      res.status(400).send({ code: 400, message: "current Date is empty" });
    }
    res.status(200).send({ code: 200, message: "Last Activated", currentDate });
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updateLastActivated = async (req, res) => {
  try {
    const accountNo = req.body.accountNo;
    const currentDate = new Date();

    if (!accountNo) {
      // Object.assign(obj, { email });
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
