const mongoose = require("mongoose");
const userSchema = require("../mongoDB/models/users");
const jwtSign = require("../utils/jwtSign");
//const validSchema = require('../validators/users')

const registerUser = async (req, res) => {
  try {
    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailId: req.body.emailId,
      dateOfBirth: req.body.dateOfBirth,
      username: req.body.username,
      password: req.body.password,
      phoneNo: req.body.phoneNo,
      address: {
        firstline: req.body.address.firstline,
        secondline: req.body.address.secondline,
        city: req.body.address.city,
        country: req.body.address.country,
        pin: req.body.address.pin,
      },
    };
    const result = await validSchema.validateAsync(userInfo);
    
    //if(!result) {
    //  res.status(400).send({code : 400, message : "Invalid Schema"})
    //}
    const userData = await userSchema.users.create(userInfo);
    const tokenData = {
      id: userData._id,
      username: userData.username,
      emailId: userData.emailId,
    };

    const token = jwtSign(tokenData, "easybanking");
    res
      .status(200)
      .send({ code: 200, message: "Data Saved sucessfully", token, userData });
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error",error });
  }
};

const validateUser = async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: req.body.password,
    };

    const userData = await userSchema.users.findOne(userInfo);

    if (userData) {
      res.status(400).send({ code: 400, message: "User already exists" });
    } else {
      res.status(200).send({ code: 200, message: "USer not exists" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ code: 500, message: "Internal server error", error });
  }
};

const updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;

    const obj = {};

    if (password) {
      Object.assign(obj, { password });
    }

    const updateData = await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: obj,
      }
    );
    if (updateData) {
      res
        .status(200)
        .send({ code: 200, message: "User password Updated", updateData });
    } else {
      res.status(400).send({ code: 400, message: "Error Can not update" });
    }
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const {
      firstname,
      lastname,
      emailId,
      username,
      dateOfBirth,
      phoneNo,
      address,
    } = req.body;
    console.log(address);

    const obj = {};
    if (firstname) {
      Object.assign(obj, { firstname });
    }
    if (lastname) {
      Object.assign(obj, { lastname });
    }
    if (emailId) {
      Object.assign(obj, { emailId });
    }
    if (username) {
      Object.assign(obj, { username });
    }
    if (dateOfBirth) {
      Object.assign(obj, { dateOfBirth });
    }
    if (phoneNo) {
      Object.assign(obj, { phoneNo });
    }
    if (address) {
      Object.assign(obj, { address });
    }

    const updateData = await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: obj,
      }
    );
    if (updateData) {
      res.status(200).send({ code: 200, message: "User Updated", updateData });
    } else {
      res.status(400).send({ code: 400, message: "Error Can not update" });
    }
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.body.emailId;
    // const obj = {};

    if (!email) {
      // Object.assign(obj, { email });
      res.status(400).send({ code: 400, message: "Email is empty" });
    }

    await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: { emailId: email },
      }
    );
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }

  res.status(200).send({ code: 200, message: "email Updated" });
};

const updatephone = async (req, res) => {
  try {
    const id = req.params.id;
    const phone = req.body.phoneNo;
    // const obj = {};

    if (!phone) {
      // Object.assign(obj, { email });
      res.status(400).send({ code: 400, message: "phone is empty" });
    }

    await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: { phoneNo: phone },
      }
    );
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }

  res.status(200).send({ code: 200, message: "phone Updated" });
};

const updateAddress = async (req, res) => {
  try {
    const id = req.params.id;

    const { firstline, secondline, city, country, pin } = req.body;
    const obj = {};

    if (firstline) {
      Object.assign(obj, { firstline });
    }
    if (secondline) {
      Object.assign(obj, { secondline });
    }
    if (city) {
      Object.assign(obj, { city });
    }
    if (country) {
      Object.assign(obj, { country });
    }
    if (pin) {
      Object.assign(obj, { pin });
    }

    await userSchema.users.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set:{address:obj},
      }
    );
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }

  res.status(200).send({ code: 200, message: "Address Updated" });
};

const getbyphoneno = async (req, res) => {
  try{ 
    const phone = req.body.phoneNo;

    const userData = await userSchema.users.find({ phoneNo: phone });

    if (userData) {
    res
      .status(200)
      .send({ code: 200, message: "User Details Feteched", data: userData });
    } else {
      res.status(400).send({ code: 400, message: "Error Can not fetch" });
    }
  }catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }

};

const getbyname = async (req, res) => {
  try{
    const fname = req.body.firstname;
    const lname = req.body.lastname;

    console.log(fname + lname);
    const userData = await userSchema.users.find({
      firstname: fname,
      lastname: lname,
    });
    //console.log(userData);
    if (userData) {
      res
        .status(200)
        .send({ code: 200, message: "User Details Feteched", data: userData });
    } else {
      res.status(400).send({ code: 400, message: "Error Can not fetch" });
    }
  }catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }

};

const getbyusername = async (req, res) => {
  try {
    const uname = req.body.username;

    const userData = await userSchema.users.find({ username: uname });

    if (userData) {
    res
      .status(200)
      .send({ code: 200, message: "User Feteched", data: userData });
    } else {
    res.status(400).send({ code: 400, message: "Error Can not fetch" });
    }
   }catch(error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
   }
  
};

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
};
