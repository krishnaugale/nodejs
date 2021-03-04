const mongoose = require("mongoose");
const accountSchema = require("../mongoDB/models/account");
const transactionsSchema = require("../mongoDB/models/transaction");

const createNewAccoount = async (req, res) => {
  try {
    const { username, closingBalance } = req.body;
    const accountNumber = Date.now();

    const accontData = await accountSchema.accounts.create({
      userId: res.payload.id,
      accountNo: accountNumber,
      username,
      closingBalance,
    });

    res
      .status(200)
      .send({ code: 200, message: "Account Created Successfully", accontData });
  } catch (err) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const getByAccountNumber = async (req, res) => {
  try
  {
    const accNumber = req.body.accountNo;
    const accountData = await accountSchema.accounts.find({ accountNo : accNumber });
    console.log("fetched"); 
    if (accountData) 
      {
        res.status(200).send({ code: 200, message: "Account Feteched", data: accountData });
      } 
    else
      {
         res.status(400).send({ code: 400, message: "Error Can not fetch" });
      }
  }catch(err)
   {
     res.status(500).send({ code: 500, message: "Internal server error" });
   }
};

const getByUserName = async (req, res) => {
  try
  {
    const uname = req.body.username;
    const accountData = await accountSchema.accounts.find({ username : uname });
    console.log("fetched"); 
    if (accountData) 
     {
      res.status(200).send({ code: 200, message: "Account Feteched", data: accountData });
     } 
    else
      {
        res.status(400).send({ code: 400, message: "Error Can not fetch" });
      }
  }catch(err)
   {
     res.status(500).send({ code: 500, message: "Internal server error" });
   }
};

const transferAmount = async (req, res) => {
try{
  console.log("hi");
  const obj =
  {
     from : {
      accountNo : "1614740266399" ,
      amount : "1563" ,
        }, 
     to :
    {
      accountNo : "1614740266399",
    }
  } 
}catch(error)
 {
  res.status(500).send({ code: 500, message: "Internal server error" });
}

};

const addPayees = async (req, res) => {
  try {
  
    const accNumber = req.params.accountNo;
     // const payees = await accountSchema.accounts.find({ accountNo: accNumber})
    const payees = await accountSchema.accounts.updateOne(
      { accountNo: accNumber, isClosed: false },
       { $addToSet: 
       { payees: {
       "firstname" : "rishabh" ,
       "lastname" : "Sancheti",
       "accountNo " : "123456789" } } })
  
       console.log(payees);
    res.status(200).send({ code: 200, message: "Account Created Successfully", accontData });

    }catch (error) {
      //console.log(error);
      res.status(500).send({ code: 500, message: "Internal server error" , error});
      }  
    
};


const getPayees = async (req, res) => {
 try
 {
   const accNumber = "1614740266399";
   console.log(accNumber);
   const payees = await accountSchema.accounts.find({ accountNo : accNumber });
   console.log(payees); 
   if (payees) 
    {
      res.status(200).send({ code: 200, message: "Account Feteched", data: accountData });
    } 
   else
    {
       res.status(400).send({ code: 400, message: "Error Can not fetch" });
    }

 }catch(error)
 {
  res.status(500).send({ code: 500, message: "Internal server error" });
 }
};

const deletePayees = async (req, res) => 
{ 
  try{
  const accNumber = req.body.accountNo;
   console.log("hiii");
   const payees = await accountSchema.accounts.remove({ accountNo : accNumber });
   if(error)
    {
      res.status(400).send({ code: 400, message: "Error Can not Delete" });
    }
    else
    {  
      res.send({message : "payee Deleted succesfuly"});
    }
   console.log("fetched"); 
  }catch(error)
  {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
     
};

const closeAccount = async (req, res) => {
};

const openClosedAccount = async (req, res) => {
};

const lastActivated = async (req, res) => {
};

const updateLastActivated = async (req, res) => {

};

module.exports = { 
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
};
