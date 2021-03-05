const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionsSchema = new mongoose.Schema({
  amount: String,
  transferedOn: Date,
  to: String,
  from: String,
  remark: String,
  userId: String,
});

exports.transactions = mongoose.model("transactions", transactionsSchema);
