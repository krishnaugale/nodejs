const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).send({
      message: "Access denied. Authentication token not found.",
      messageCode: "TKNERR",
    });
  }
  try {
    const payload = jwt.verify(token, "easybanking");
    res.payload = payload;
    next();
  } catch (err) {
    return res.status(400).send({
      message: "Access denied. Invalid authentication token.",
      messageCode: "INVTKN",
    });
  }
};

module.exports = auth;
