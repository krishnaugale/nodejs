const Joi = require('joi')
const isValidAccountNumber = require('is-valid-account-number')

const iscreateNewAccoount = (req, res, next) => {
  const validateData = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    closingBalence: Joi.string()
      .min(0)
      .max(11)
      .required(),
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

const isgetByUserName = (req, res, next) => {
  const validateData = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
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

const isgetByAccountNumber = (req, res, next) => {
  console.log(isValidAccountNumber(12345678903))
  const validateData = Joi.object({
    accountNo: Joi.string()
      .alphanum()
      .pattern(new RegExp('[0-9]'))
      .min(12)
      .max(14)
      .required(),
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

//     const istransferAmount = (req, res, next) => {
//       const validateData = Joi.object({
//         username: Joi.string().min(3).max(30).required(),
//         closingBalence : Joi.string().min(0).max(5).required(),
//       });
//       const error = validateData.validate(req.body);

//       if (error && error.error && error.error.details.length) {
//         return res.status(400).send({
//           code: 400,
//           message: "Please Provide valid Data",
//           error: error.error.details[0],
//         });
//       }
//       next();
//     };

const isaddPayees = (req, res, next) => {
  const validateData = Joi.object({
    firstname: Joi.string()
      .min(3)
      .max(30)
      .required(),
    lastname: Joi.string()
      .min(0)
      .max(5)
      .required(),
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

const isgetPayees = (req, res, next) => {
  const validateData = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    closingBalence: Joi.string()
      .min(0)
      .max(5)
      .required(),
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

const isdeletePayees = (req, res, next) => {
  const validateData = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    closingBalence: Joi.string()
      .min(0)
      .max(5)
      .required(),
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

const iscloseAccount = (req, res, next) => {
  const validateData = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    closingBalence: Joi.string()
      .min(0)
      .max(5)
      .required(),
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

//               const isopenClosedAccount = (req, res, next) => {
//                 const validateData = Joi.object({
//                   username: Joi.string().min(3).max(30).required(),
//                   closingBalence : Joi.string().min(0).max(5).required(),
//                 });

//                 const error = validateData.validate(req.body);

//                 if (error && error.error && error.error.details.length) {
//                   return res.status(400).send({
//                     code: 400,
//                     message: "Please Provide valid Data",
//                     error: error.error.details[0],
//                   });
//                 }
//                 next();
//               };

//               const islastActivated = (req, res, next) => {
//                 const validateData = Joi.object({
//                   username: Joi.string().min(3).max(30).required(),
//                   closingBalence : Joi.string().min(0).max(5).required(),
//                 });
//                 const error = validateData.validate(req.body);

//                 if (error && error.error && error.error.details.length) {
//                   return res.status(400).send({
//                     code: 400,
//                     message: "Please Provide valid Data",
//                     error: error.error.details[0],
//                   });
//                 }
//                 next();
//               };

//                 const isupdateLastActivated = (req, res, next) => {
//                   const validateData = Joi.object({
//                     username: Joi.string().min(3).max(30).required(),
//                     closingBalence : Joi.string().min(0).max(5).required(),
//                   });
//                   const error = validateData.validate(req.body);

//                   if (error && error.error && error.error.details.length) {
//                     return res.status(400).send({
//                       code: 400,
//                       message: "Please Provide valid Data",
//                       error: error.error.details[0],
//                     });
//                   }
//                   next();
//                 };

module.exports = {
  iscreateNewAccoount,
  isgetByAccountNumber,
  isgetByUserName,
  //       istransferAmount ,
  isaddPayees,
  isgetPayees,
  isdeletePayees,
  iscloseAccount,
  //     isopenClosedAccount ,
  //     islastActivated ,
  //     isupdateLastActivated
}
