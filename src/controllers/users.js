const mongoose = require('mongoose')
const userSchema = require('../mongoDB/models/users')
const jwtSign = require('../utils/jwtSign')
const { encrypt } = require('../utils/pswEncDec')

const registerUser = async (req, res) => {
  try {
    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailId: req.body.emailId,
      dateOfBirth: req.body.dateOfBirth,
      username: req.body.username,
      password: encrypt(req.body.password).encryptedData,
      phoneNo: req.body.phoneNo,
      address: {
        firstline: req.body.address.firstline,
        secondline: req.body.address.secondline,
        city: req.body.address.city,
        country: req.body.address.country,
        pin: req.body.address.pin,
      },
    }
    const userData = await userSchema.users.create(userInfo)
    const tokenData = {
      id: userData._id,
      username: userData.username,
      emailId: userData.emailId,
    }

    const token = jwtSign(tokenData, 'easybanking')
    return res
      .status(200)
      .send({ code: 200, message: 'Data Saved sucessfully', token, userData })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const validateUser = async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: encrypt(req.body.password).encryptedData,
    }

    const userData = await userSchema.users.findOne(userInfo)

    if (userData) {
      return res
        .status(200)
        .send({ code: 400, message: 'User already exists', userData })
    }
    return res.status(400).send({ code: 200, message: 'User not exists' })
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: 'Internal server error', error })
  }
}

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params
    const password = encrypt(req.body.password).encryptedData

    // console.log(decrypt(encrypt(req.body.password)));

    const obj = {}

    if (password) {
      Object.assign(obj, { password })
    }

    const updateData = await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: obj,
      },
    )
    if (updateData) {
      return res
        .status(200)
        .send({ code: 200, message: 'User password Updated', updateData })
    }
    return res.status(400).send({ code: 400, message: 'Error Can not update' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const {
      firstname,
      lastname,
      emailId,
      username,
      dateOfBirth,
      phoneNo,
      address,
    } = req.body

    const obj = {}
    if (firstname) {
      Object.assign(obj, { firstname })
    }
    if (lastname) {
      Object.assign(obj, { lastname })
    }
    if (emailId) {
      Object.assign(obj, { emailId })
    }
    if (username) {
      Object.assign(obj, { username })
    }
    if (dateOfBirth) {
      Object.assign(obj, { dateOfBirth })
    }
    if (phoneNo) {
      Object.assign(obj, { phoneNo })
    }
    if (address) {
      Object.assign(obj, { address })
    }

    const updateData = await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: obj,
      },
    )
    if (updateData) {
      return res
        .status(200)
        .send({ code: 200, message: 'User Updated', updateData })
    }
    return res.status(400).send({ code: 400, message: 'Error Can not update' })
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const updateEmail = async (req, res) => {
  try {
    const { id } = req.params
    const email = req.body.emailId

    await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: { emailId: email },
      },
    )
    return res.status(200).send({ code: 200, message: 'email Updated' })
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const updatephone = async (req, res) => {
  try {
    const { id } = req.params
    const phone = req.body.phoneNo

    await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: { phoneNo: phone },
      },
    )
    return res.status(200).send({ code: 200, message: 'phone Updated' })
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params

    const { firstline, secondline, city, country, pin } = req.body
    const obj = {}

    if (firstline) {
      Object.assign(obj, { firstline })
    }
    if (secondline) {
      Object.assign(obj, { secondline })
    }
    if (city) {
      Object.assign(obj, { city })
    }
    if (country) {
      Object.assign(obj, { country })
    }
    if (pin) {
      Object.assign(obj, { pin })
    }

    await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: { address: obj },
      },
    )
    return res.status(200).send({ code: 200, message: 'Address Updated' })
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

const getbyphoneno = async (req, res) => {
  const { phoneNo } = req.body

  const userData = await userSchema.users.find({ phoneNo })

  if (userData) {
    return res
      .status(200)
      .send({ code: 200, message: 'User Details Feteched', data: userData })
  }
  return res.status(400).send({ code: 400, message: 'Error Can not fetch' })
}

const getbyname = async (req, res) => {
  const fname = req.body.firstname
  const lname = req.body.lastname

  const userData = await userSchema.users.find({
    firstname: fname,
    lastname: lname,
  })
  if (userData) {
    return res
      .status(200)
      .send({ code: 200, message: 'User Details Feteched', data: userData })
  }
  return res.status(400).send({ code: 400, message: 'Error Can not fetch' })
}

const getbyusername = async (req, res) => {
  try {
    const uname = req.body.username

    const userData = await userSchema.users.find({ username: uname })

    if (userData) {
      return res
        .status(200)
        .send({ code: 200, message: 'User Feteched', data: userData })
    }
    return res.status(400).send({ code: 400, message: 'Error Can not fetch' })
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal server error' })
  }
}

module.exports = {
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
}
