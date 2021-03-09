const express = require("express");
const router = express.Router();
const { 
    createNewAccoount , 
    getByAccountNumber ,
    getByUserName ,
    transferAmount ,
    addPayees ,
    getPayees ,
    deletePayees ,
    closeAccount ,
    openClosedAccount , 
    lastActivated ,
    updateLastActivated
    } = require("../controllers/account");
    
        const {
                iscreateNewAccoount ,
                isgetByAccountNumber ,
                isgetByUserName ,
                isaddPayees ,
                isgetPayees ,
                isdeletePayees ,
                iscloseAccount  
              } = require('../validators/account/')
      
    
        const auth = require("../middelware/auth");

router.post("/account/createNewAccount", auth, iscreateNewAccoount, createNewAccoount);

router.get("/account/getByAccountNumber", auth, isgetByAccountNumber ,getByAccountNumber);

router.get("/account/getByUserName", auth, isgetByUserName, getByUserName);

router.post("/account/transferAmount", auth, transferAmount);

router.post("/account/addPayees/:accountNo", auth ,isaddPayees, addPayees);

router.get("/account/getPayees", auth, isgetPayees, getPayees);

router.delete("/account/deletePayees", auth, isdeletePayees, deletePayees);

router.post("/account/closeAccount", auth, iscloseAccount , closeAccount);

router.post("/account/openClosedAccount", auth, openClosedAccount);

router.get("/account/lastActivated", auth, lastActivated);

router.post("/account/updateLastActivated", auth, updateLastActivated);

module.exports = router;
