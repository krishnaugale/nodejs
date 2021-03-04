const Joi = require("joi");
//const userSchema = require("../mongoDB/models/users");
const userSchema = require('../../mongoDB/models/users')

const isUserRegisterDataValid = (req, res, next) => {
  const validateData = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    username: Joi.string().alphanum().min(3).max(30).required(),
    phoneNo: Joi.string().alphanum().min(3).max(30).required(),
    address: Joi.object({
        firstline : Joi.string().alphanum().min(3).max(30),
        secondline : Joi.string().alphanum().min(3).max(30),
        city : Joi.string().min(3).max(30),
        country : Joi.string().min(3).max(30),
        pin : Joi.string().max(6),
    }),
    dateOfBirth: Joi.date().format('YYYY-MM-DD'),
    emailId: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
const error = validateData.validate(req.body);

console.log(error);
if(error && error.error && error.error.details.length) {
   return res.status(400).send({code: 400 , message : "Please Provide valid Data"})
}
next();
};

const isUsernameExist = async (req,res,next) => {
    try {
        const userInfo  ={
            username : req.body.username
        } 

        const userData = await userSchema.users.findOne(userInfo);
        if (userData) {
            res.status(400).send({ code: 400, message: "User already exists" });
        } else {
           next();
        }
        
    } catch (error) {
        res.status(500).send({ code: 500, message: "Internal Server Error" }); 
    }
};
const isPasswordValid = async (req,res,next) => {
    console.log("Insid isPasswordValid");
    const validateData = Joi.object({
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const error = validateData.validate(req.body);
    
    console.log(error);
    if(error && error.error && error.error.details.length) {
        return res.status(400).send({code: 400 , message : "Please Provide valid Password"})
    }
   next();
};

const isEmailValid = async (req,res,next) => {
    const validateData = Joi.object({
        emailId: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          }),
    });
    const error = validateData.validate(req.body);
    
    console.log(error);
    if(error && error.error && error.error.details.length) {
        return res.status(400).send({code: 400 , message : "Please Provide valid Email"})
    }
   next();
};

const isPhonenoValid = async (req,res,next) => {
    const validateData = Joi.object({
        phoneNo: Joi.string().alphanum().pattern(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")).min(3).max(30).required(),
    });

    const error = validateData.validate(req.body);
    
    console.log(error);
    if(error && error.error && error.error.details.length) {
        return res.status(400).send({code: 400 , message : "Please Provide valid Phone no"})
    }
   next();
};


const isAddressValid = async (req,res,next) => {
    const validateData = Joi.object({
        firstline : Joi.string().min(3).max(30),
        secondline : Joi.string().min(3).max(30),
        city : Joi.string().pattern(new RegExp("[a-zA-Z]$")).min(3).max(30),
        country : Joi.string().pattern(new RegExp("[a-zA-Z]$")).min(3).max(30),
        pin : Joi.string().min(6).max(6),
    });

    const error = validateData.validate(req.body);
    
    console.log(error);
    if(error && error.error && error.error.details.length) {
        return res.status(400).send({code: 400 , message : "Please Provide valid Address"})
    }
   next();
};

const isNameValid = async (req,res,next) => {
    const validateData = Joi.object({
        firstname: Joi.string().alphanum().min(3).max(30).required(),
        lastname: Joi.string().alphanum().min(3).max(30).required(),
    });

    const error = validateData.validate(req.body);
    
    console.log(error);
    if(error && error.error && error.error.details.length) {
        return res.status(400).send({code: 400 , message : "Please Provide valid Name"})
    }
   next();
};

const isUsernameValid = async (req,res,next) => {
    const validateData = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
    });

    const error = validateData.validate(req.body);
    
    console.log(error);
    if(error && error.error && error.error.details.length) {
        return res.status(400).send({code: 400 , message : "Please Provide valid Username"})
    }
   next();
};

module.exports = { 
    isUserRegisterDataValid,
    isUsernameExist,
    isPasswordValid,
    isEmailValid,
    isPhonenoValid,
    isAddressValid,
    isNameValid,
    isUsernameValid
 };
