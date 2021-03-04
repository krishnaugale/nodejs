const jwt = require("jsonwebtoken");

const jwtSign = (user, secret) => jwt.sign(user, secret);

module.exports = jwtSign;
