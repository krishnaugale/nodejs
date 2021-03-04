const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const validSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .max(30),
    lastname: Joi.string()
        .alphanum()
        .max(30),
    emailId: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    dateOfBirth:Joi.date().iso(),

    password: Joi.string()
        //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        ,
    phoneNo : Joi.number().min(10),
    address : {
        firstline: Joi.string()
        .alphanum()
        .max(30),
    secondline: Joi.string()
        .alphanum()
        .max(30),
    city: Joi.string()
        .alphanum()
        .max(30),
    country: Joi.string()
        .alphanum()
        .max(30),
    pin: Joi.string()
        .alphanum()
        .max(30),
    },
})
.with('username', 'password')


module.exports = {validSchema}
