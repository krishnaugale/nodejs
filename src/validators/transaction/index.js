const Joi = require('joi')

const isTransactionValid = (req, res, next) => {
  const validateData = Joi.object({
    amount: Joi.string()
      .pattern(new RegExp('[0-9]$'))
      .required(),
    transferedOn: Joi.date()
      .iso()
      .required(),
    to: Joi.string()
      .min(13)
      .max(13)
      .required(),
    from: Joi.string()
      .min(13)
      .max(13)
      .required(),
    remark: Joi.string()
      .min(4)
      .max(7)
      .required(),
  })
  const error = validateData.validate(req.body)

  if (error && error.error && error.error.details.length) {
    return res.status(400).send({
      code: 400,
      message: 'Please Provide valid Data',
    })
  }
  return next()
}

module.exports = {
  isTransactionValid,
}
