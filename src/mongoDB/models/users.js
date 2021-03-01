const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uuid: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: true,
    default: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
});

exports.users = mongoose.model("users", userSchema);
