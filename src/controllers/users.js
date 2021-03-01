const userSchema = require('../mongoDB/models/users');

const registerUser = async (req, res) => {
  try {
    const userInfo =  {
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      emailid:  req.body.email,
      dateOfBirth :  req.body.dateOfBirth,
      username:  req.body.username,
      password :  req.body.password,
      phoneno  :req.body.phoneno,
      address : { 
        firstline :req.body.address.firstline ,
        secondline :req.body.address.secondline,
        city : req.body.address.city,
        country : req.body.address.country,
        pin : req.body.address.pin,
      }
    }

    const userData = await userSchema.users.create(userInfo);
    res.status(200).send({ code: 200, message: "Data Saved sucessfully" ,userData});
     

  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const validateUser = (req, res) => {
  try {
    throw Error("Error");
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updatePassword = (req, res) => {
  try {
    throw Error("Error");
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updateEmail = (req, res) => {
  try {
    throw Error("Error");
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

module.exports = { registerUser, validateUser, updatePassword, updateEmail };
