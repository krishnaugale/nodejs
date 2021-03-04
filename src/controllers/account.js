const mongoose = require("mongoose");
const accountSchema = require("../mongoDB/models/account");

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

module.exports = { createNewAccoount };
