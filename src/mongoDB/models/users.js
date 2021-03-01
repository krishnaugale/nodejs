
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uuid: {
    type: String,
    default: "",
  },
  firstname: String,
  lastname: String,
  emailId: String,
  username: { type: String, unique: true },
  dateOfBirth: Date,
  password: String,
  phoneNo: String,
  address: {
    firstline: String,
    secondline: String,
    city: String,
    country: String,
    pin: String,
  },
})
exports.users = mongoose.model("users", userSchema);
