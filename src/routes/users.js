const express = require("express");
const router = express.Router();
const {
  registerUser,
  validateUser,
  updatePassword,
  updateEmail,
  updatephone,
  getbyname,
  getbyphoneno,
  getbyusername,
  updateUser,
  updateAddress,
} = require("../controllers/users");
const auth = require("../middelware/auth");

router.post("/user/register", registerUser);

router.post("/user/validateUser", validateUser);

router.put("/user/updatePassword/:id", auth, updatePassword);

router.put("/user/updateUser/:id", updateUser);

router.put("/user/updateEmail/:id", updateEmail);

router.put("/user/updatePhone/:id", updatephone);

router.put("/user/updateAddress/:id", updateAddress);

router.get("/user/getuserbyname", getbyname);

router.get("/user/getuserbyusername", getbyusername);

router.get("/user/getuserbyphoneno", getbyphoneno);

module.exports = router;
