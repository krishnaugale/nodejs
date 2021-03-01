const express = require("express");
const router = express.Router();
const {
  registerUser,
  validateUser,
  updatePassword,
  updateEmail,
} = require("../controllers/users");

router.post("/user/register", registerUser);

router.post("/user/validateUser", validateUser);

router.post("/user/updatePassword", updatePassword);

router.post("/user/updateEmail", updateEmail);

module.exports = router;
