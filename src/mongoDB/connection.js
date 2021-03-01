const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017/easybanking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = dbConnect;
