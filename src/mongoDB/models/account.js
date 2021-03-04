const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new mongoose.Schema({
  userId: { type: String, default: "0" },
  username: { type: String, unique: true },
  accountNo: { type: String, unique: true },
  closingBalance: { type: String, default: "0" },
  createdOn: { type: Date, default: Date.now() },
  lastActive: { type: Date, default: Date.now() },
  payees: [ 
    {
      firstname: String,
      lastname: String,
      accountNo: String,
    },
  ],
  isClosed: { type: Boolean, default: false },
  closedOn: { type: Date, default: Date.now() },
});

exports.accounts = mongoose.model("accounts", accountSchema);
