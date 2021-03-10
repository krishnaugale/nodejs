const Joi = require('joi')
const userSchema = require('../../../../mongoDB/customers/models/users')

const isUsetrRegisterDataValid = (req, res, next) => {
  const validateData = Joi.object({
    firstname: Joi.string()
      .min(3)
      .max(30)
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required(),
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    phoneNo: Joi.string()
      .min(3)
      .max(30)
      .required(),
    address: Joi.object({
      firstline: Joi.string()
        .min(3)
        .max(30),
      secondline: Joi.string()
        .min(3)
        .max(30),
      city: Joi.string()
        .min(3)
        .max(30),
      country: Joi.string()
        .min(3)
        .max(30),
      pin: Joi.string().max(6),
    }),
    dateOfBirth: Joi.string(),
    emailId: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  })
  const error = validateData.validate(req.body)

  if (error && error.error && error.error.details.length) {
    return res.status(400).send({
      code: 400,
      message: 'Please Provide valid Data',
      error: error.error.details[0],
    })
  }
  return next()
}

const isUsernameExist = async (req, res, next) => {
  try {
    const userInfo = {
      username: req.body.username,
    }

    const userData = await userSchema.users.findOne(userInfo)
    if (userData) {
      return res.status(400).send({ code: 400, message: 'User already exists' })
    }

    return next()
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal Server Error' })
  }
}
const isPasswordValid = async (req, res, next) => {
  const validateData = Joi.object({
    password: Joi.string()
      .min(3)
      .max(30)
      .required(),
  })
  const error = validateData.validate(req.body)

  if (error && error.error && error.error.details.length) {
    return res
      .status(400)
      .send({ code: 400, message: 'Please Provide valid Password' })
  }
  return next()
}

const isEmailValid = async (req, res, next) => {
  const validateData = Joi.object({
    emailId: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  })
  const error = validateData.validate(req.body)

  if (error && error.error && error.error.details.length) {
    return res
      .status(400)
      .send({ code: 400, message: 'Please Provide valid Email' })
  }

  return next()
}

const isPhonenoValid = async (req, res, next) => {
  const validateData = Joi.object({
    phoneNo: Joi.string()
      .alphanum()
      .pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'))
      .min(3)
      .max(30)
      .required(),
  })

  const error = validateData.validate(req.body)

  if (error && error.error && error.error.details.length) {
    return res
      .status(400)
      .send({ code: 400, message: 'Please Provide valid Phone no' })
  }
  return next()
}

const isAddressValid = async (req, res, next) => {
  const validateData = Joi.object({
    firstline: Joi.string()
      .min(3)
      .max(30),
    secondline: Joi.string()
      .min(3)
      .max(30),
    city: Joi.string()
      .pattern(new RegExp('[a-zA-Z]$'))
      .min(3)
      .max(30),
    country: Joi.string()
      .pattern(new RegExp('[a-zA-Z]$'))
      .min(3)
      .max(30),
    pin: Joi.string()
      .min(6)
      .max(6),
  })

  const error = validateData.validate(req.body)

  if (error && error.error && error.error.details.length) {
    return res
      .status(400)
      .send({ code: 400, message: 'Please Provide valid Address' })
  }
  return next()
}

const isNameValid = async (req, res, next) => {
  const validateData = Joi.object({
    firstname: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    lastname: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
  })

  const error = validateData.validate(req.body)

  console.log(error)
  if (error && error.error && error.error.details.length) {
    return res
      .status(400)
      .send({ code: 400, message: 'Please Provide valid Name' })
  }
  return next()
}

const isUsernameValid = async (req, res, next) => {
  const validateData = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
  })

  const error = validateData.validate(req.body)

  console.log(error)
  if (error && error.error && error.error.details.length) {
    return res
      .status(400)
      .send({ code: 400, message: 'Please Provide valid Username' })
  }
  return next()
}

module.exports = {
  isUsetrRegisterDataValid,
  isUsernameExist,
  isPasswordValid,
  isEmailValid,
  isPhonenoValid,
  isAddressValid,
  isNameValid,
  isUsernameValid,
}
