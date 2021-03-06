const Joi = require("joi");
const { model } = require("mongoose");
const accountSchema = require("../../mongoDB/models/account");
const transactionsSchema = require("../../mongoDB/models/transaction");


const iscreateNewAccoount = (req, res, next) => {
  const validateData = Joi.object({
    // firstname: Joi.string().min(3).max(30).required(),
    // lastname: Joi.string().min(3).max(30).required(),
    // password: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(3).max(30).required(),
    closingBalence : Joi.string().min(0).max(5).required(),
    // address: Joi.object({
    //   firstline: Joi.string().min(3).max(30),
    //   secondline: Joi.string().min(3).max(30),
    //   city: Joi.string().min(3).max(30),
    //   country: Joi.string().min(3).max(30),
    //   pin: Joi.string().max(6),
    // console.log("welcome")
    // }),
    // dateOfBirth: Joi.string(),
    // emailId: Joi.string().email({
    //   minDomainSegments: 2,
    //   tlds: { allow: ["com", "net"] },
    // }),
  

 
});
  const error = validateData.validate(req.body);

  if (error && error.error && error.error.details.length) {
    return res.status(400).send({
      code: 400,
      message: "Please Provide valid Data",
      error: error.error.details[0],
    });
  }
  next();
};

module.exports =
{
    iscreateNewAccoount,
}