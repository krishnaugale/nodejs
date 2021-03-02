const express = require("express");
const router = express.Router();
const { createNewAccoount } = require("../controllers/account");
const auth = require("../middelware/auth");

router.post("/account/createNewAccount", auth, createNewAccoount);

module.exports = router;
