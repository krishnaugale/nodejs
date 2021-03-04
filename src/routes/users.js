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

const {
  isUserRegisterDataValid ,
  isUsernameExist,
  isPasswordValid,
  isEmailValid,
  isPhonenoValid,
  isNameValid,
  isUsernameValid,
  isAddressValid,
  } = require('../validators/users/')

router.post("/user/register",[isUserRegisterDataValid,isUsernameExist], registerUser);

router.post("/user/validateUser",[isPasswordValid,isUsernameValid],validateUser);

router.put("/user/updatePassword/:id", auth,[isPasswordValid], updatePassword);

router.put("/user/updateUser/:id",[isUserRegisterDataValid], updateUser);

router.put("/user/updateEmail/:id",auth,[isEmailValid], updateEmail);

router.put("/user/updatePhone/:id",auth,[isPhonenoValid], updatephone);

router.put("/user/updateAddress/:id",auth,[isAddressValid], updateAddress);

router.get("/user/getuserbyname",[isNameValid], getbyname);

router.get("/user/getuserbyusername",auth,[isUsernameValid],  getbyusername);

router.get("/user/getuserbyphoneno",auth,[isPhonenoValid], getbyphoneno);

module.exports = router;
